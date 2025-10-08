import { createRowCache } from "@devexpress/dx-react-grid";
import { CheckBox } from "devextreme-react/check-box";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { baseURLWithoutApi, baseURL } from "../../../../request";
import { buildApiUrl } from "../../../hooks/APIsFunctions/BuildApiUrl";
import LoadData from "../../../hooks/APIsFunctions/loadData";
import DotsLoading from "../../../loading/DotsLoading";
import { listObserverStyle } from "../../DynamicTable/styles";
import { stylesFile } from "../styles";
import TypeFile from "../TypeFile";
const VIRTUAL_PAGE_SIZE = 4;
const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: "",
};

function FilesWithScrollPaging({
  title,
  idField,
  row,
  selectedServerFiles,
  setSelectedServerFiles,
  getAction,
  fileFieldName,
  proxyRoute,
}) {
  function reducer(state, { type, payload }) {
    switch (type) {
      case "UPDATE_ROWS":
        return {
          ...state,
          rows: Array.from(
            new Map(
              [...state.rows, ...payload?.rows].map((item) => [
                item[idField],
                item,
              ])
            ).values()
          ), // Append new rows to the existing rows
          totalCount: payload.totalCount,
          loading: false,
        };
      case "START_LOADING":
        return {
          ...state,
          requestedSkip: payload.requestedSkip,
          take: payload.take,
        };
      case "REQUEST_ERROR":
        return {
          ...state,
          loading: false,
        };
      case "FETCH_INIT":
        return {
          ...state,
          loading: true,
        };
      case "UPDATE_QUERY":
        return {
          ...state,
          lastQuery: payload,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const [currentSkip, setCurrentSkip] = useState(1);
  const observerRef = useRef();
  const { [fileFieldName]: _, ...rowWithoutFieldName } = row;

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
    // Load remote data logic here
  };
  const dataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      ...row,
    });
  };
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE), []);

  const updateRows = (skip, count, newTotalCount) => {
    dispatch({
      type: "UPDATE_ROWS",
      payload: {
        skip,
        rows: cache.getRows(skip, count),
        totalCount: newTotalCount ? newTotalCount : state.totalCount,
      },
    });
  };

  // Load data whenever skip or take state changes
  useEffect(() => {
    LoadData(state, dataSourceAPI, getAction, cache, updateRows, dispatch);
  });
  const { rows, skip, totalCount, loading } = state;

  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && rows.length < totalCount && !loading) {
        getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2);
        setCurrentSkip(currentSkip + 1);
      }
    },
    [rows, totalCount, loading, skip]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerCallback]);
  const handleCheckboxChange = (file) => {
    // file.fileCodeNumber === "image"
    //   ? (file.fileCodeNumber = 0)
    //   : (file.fileCodeNumber = 1);
    setSelectedServerFiles((prevSelected) =>
      prevSelected.includes(file)
        ? prevSelected.filter((i) => i !== file)
        : [...prevSelected, { ...file, ...row }]
    );
  };

  return (
    <div className={stylesFile.fileListContainer}>
      {state.rows
        ?.map((row) => ({
          ...row,

          displayFile: `${row[fileFieldName]}`,
          file: `${baseURL}/${proxyRoute}/${row[fileFieldName]}`,
          fileCodeNumber: row.fileCodeNumber === 0 ? "image" : "video",
          id: row[idField],
        }))
        .map((photo, i) => (
          <div
            key={i}
            title={title}
            className={stylesFile.validFile + stylesFile.fileScroll}
          >
            <div className={stylesFile.fileControls + " mb-1"}>
              <CheckBox
                value={selectedServerFiles.includes(photo)}
                onValueChanged={() => handleCheckboxChange(photo)}
              />
              {/* {deleteAction && (
                  <MdDelete
                    onClick={() => handleDelete(photo.id, true)}
                    className={stylesFile.deleteIcon}
                    size={24}
                  />
                )} */}
            </div>
            <TypeFile
              file={photo.file}
              title={title}
              type={photo.fileCodeNumber}
            />
          </div>
        ))}
      {state.rows && (
        <div ref={observerRef} className={listObserverStyle.container} />
      )}
      {loading && <DotsLoading />}
    </div>
  );
}

export default FilesWithScrollPaging;
