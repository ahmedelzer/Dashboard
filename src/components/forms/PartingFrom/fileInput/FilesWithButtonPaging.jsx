import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CheckBox } from "devextreme-react/check-box";
import { ImageParameterWithPanelActions } from "../../../inputs";
import convertImageToBase64 from "../../../inputs/InputActions/ConvertImageToBase64";
import { LanguageContext } from "../../../../contexts/Language";
import { stylesFile } from "../styles";
import TypeFile from "../TypeFile";
import DeleteItem from "../DeleteItem";
import { baseURLWithoutApi } from "../../../../request";
import { buildApiUrl } from "../../../hooks/APIsFunctions/BuildApiUrl";
import { createRowCache } from "@devexpress/dx-react-grid";
import LoadData from "../../../hooks/APIsFunctions/loadData";
import { listObserverStyle } from "../../DynamicTable/styles";
import Loading from "../../../loading/Loading";
import DotsLoading from "../../../loading/DotsLoading";
import { MdDelete } from "react-icons/md";
const VIRTUAL_PAGE_SIZE = 4;
const MAX_ROWS = 50000;

const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: "",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "UPDATE_ROWS":
      return {
        ...state,
        ...payload,
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
function FilesWithButtonPaging({
  title,
  idField,
  row,
  getAction,
  deleteAction,
  handleToDelete,
  fileFieldName,
}) {
  const { localization } = useContext(LanguageContext);

  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteWithApi, setDeleteWithApi] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setItemsPerPage(8);
    } else if (width >= 768) {
      setItemsPerPage(6);
    } else if (width >= 640) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(2);
    }
  };

  // Set itemsPerPage on component mount and window resize
  useEffect(() => {
    updateItemsPerPage(); // Set initial value
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
    // Load remote data logic here
  };

  const dataSourceAPI = (query, skip, take) =>
    buildApiUrl(query, {
      pageIndex: currentPage,
      pageSize: itemsPerPage,
      ...row,
    });

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
  const totalPages = Math.ceil(state.totalCount / itemsPerPage);

  const handlePageChange = (newPage) => {
    getRemoteRows(newPage, itemsPerPage);
    setCurrentPage(newPage);
  };

  const handleDelete = (index, withApi) => {
    setDeleteID(index);
    setDeleteWithApi(withApi);
    setModalDeleteIsOpen(true);
  };
  return (
    <div>
      <div className={stylesFile.gridContainer}>
        {state.rows
          ?.map((row) => ({
            ...row,

            displayFile: `${baseURLWithoutApi}/${row[fileFieldName]}`,
            fileCodeNumber: row.fileCodeNumber === 0 ? "image" : "video",
            id: row[idField],
          }))
          .map((photo, i) => (
            <div
              key={i}
              title={title || "imf"}
              className={stylesFile.validFile}
            >
              {deleteAction && (
                <div className={stylesFile.fileControls + " !justify-end"}>
                  <MdDelete
                    onClick={() => handleDelete(photo.id, true)}
                    className={stylesFile.deleteIcon}
                    size={24}
                  />
                </div>
              )}
              <TypeFile
                file={photo.displayFile}
                title={title}
                type={photo.fileCodeNumber}
              />
            </div>
          ))}
      </div>

      <div className={stylesFile.pagination}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={stylesFile.paginationButton + " pop"}
        >
          {localization.fileContainer.pagination.buttonPrevious}
        </Button>
        <span className="mx-4">
          {localization.fileContainer.pagination.page} {currentPage}{" "}
          {localization.fileContainer.pagination.of} {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={stylesFile.paginationButton + " pop"}
        >
          {localization.fileContainer.pagination.buttonNext}
        </Button>
      </div>
      <DeleteItem
        id={deleteID}
        modalIsOpen={modalDeleteIsOpen}
        setModalIsOpen={setModalDeleteIsOpen}
        DeleteItemCallback={handleToDelete}
        deleteWithApi={deleteWithApi}
        action={deleteAction}
      />
    </div>
  );
}

export default FilesWithButtonPaging;
