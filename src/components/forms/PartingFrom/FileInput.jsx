import React, { useEffect, useMemo, useReducer, useState } from "react";
import { CheckBox } from "devextreme-react/check-box"; // Import DevExtreme CheckBox
import { ImageParameterWithPanelActions } from "../../inputs";
import { MdDelete } from "react-icons/md";
import TypeFile from "./TypeFile";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { defaultProjectProxyRoute, SetReoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { stylesFile } from "./styles";
import convertImageToBase64 from "../../inputs/InputActions/ConvertImageToBase64";
import { PrepareInputValue } from "../../inputs/InputActions/PrepareInputValue";
import { Button } from "reactstrap";
import local from "../../../locals/EN/fileContainer.json";
import DeleteItem from "./DeleteItem";
import { baseURLWithoutApi } from "../../../request";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import { createRowCache } from "@devexpress/dx-react-grid";
import { loadData } from "../../hooks/APIsFunctions/loadData";
const VIRTUAL_PAGE_SIZE = 2;
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
function FileInput({
  row,
  value,
  selectedFiles,
  setSelectedFiles,
  fieldName,
  title,
  getAction,
}) {
  const [Files, setFiles] = useState(value || []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteWithApi, setDeleteWithApi] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [itemsPerPage, setItemsPerPage] = useState(8); //todo it is take // Default for large screens

  const getRemoteRows = (requestedSkip, take) => {
    console.log("Current" + requestedSkip + " skip" + take);
    dispatch({ type: "START_LOADING", payload: { requestedSkip, take } });
  };
  const [currentvalueFromAction, setCurrentvalueFromAction] = useState([]);
  // console.log(valueFromAction, currentvalueFromAction);

  const [indexOfLastFile, setIndexOfLastFile] = useState(
    currentPage * itemsPerPage
  );
  const indexOfFirstFile = indexOfLastFile - itemsPerPage;
  const currentFiles = Files.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil((Files.length + state.totalCount) / state.take);
  function ChangeContainerInfo(items) {
    setIndexOfLastFile(currentPage * itemsPerPage);
    setItemsPerPage(items);
  }
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      ChangeContainerInfo(8);
    } else if (width >= 992) {
      ChangeContainerInfo(6); // 3 columns, 2 rows
    } else if (width >= 768) {
      ChangeContainerInfo(4); // 2 columns, 2 rows
    } else {
      ChangeContainerInfo(2); // 1 column, 2 rows
    }
  };
  useEffect(() => {
    updateItemsPerPage(); // Set initial value
  }, [window.res]);

  //here

  const dataSourceAPI = (query, skip, take) =>
    buildApiUrl(query, {
      pageIndex: skip / take + 1,
      pageSize: take,
      ...row,
    });
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  const updateRows = (skip, count, newTotalCount) => {
    dispatch({
      type: "UPDATE_ROWS",
      payload: {
        skip,
        rows: cache.getRows(skip, count),
        totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
      },
    });
  };
  useEffect(() => {
    loadData(state, dataSourceAPI, getAction, cache, updateRows, dispatch);
  });
  const { [fieldName]: _, ...rowWithoutFieldName } = row;

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      [...files].forEach((file) => {
        addFile(file);
      });
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImage = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      [...files].forEach((file) => {
        addFile(file);
      });
    }
  };
  const addFileActions = async (path, type) => {
    try {
      const base64String = await convertImageToBase64(path);
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          file: path,
          id: prevFiles.length,
          [fieldName]: base64String,
          type: type,
          ...rowWithoutFieldName,
        },
      ]);
      return base64String;
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
      return null;
    }
  };
  //todo marge actions
  const addFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // addFileActions(file,file.type);
      let base64Data = reader.result;
      const [, base64String] = base64Data.split(";base64,");
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          ...rowWithoutFieldName,
          file: file,
          [fieldName]: base64String,
          id: prevFiles.length,
        },
      ]);
    };
  };

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(file)
        ? prevSelected.filter((i) => i !== file)
        : [...prevSelected, file]
    );
  };

  const handleDelete = (index, withApi) => {
    setDeleteID(index);
    setDeleteWithApi(withApi);
    setModalIsOpen(true);
    // confirem
    // DeleteItem
  };
  const handleToDeleteWithoutAPI = (index) => {
    setFiles((prevFiles) => prevFiles.filter((i) => i.id !== index));
    setSelectedFiles((prevSelected) =>
      prevSelected.filter((i) => i.id !== index)
    );
  };
  const handleToDeleteWithAPI = (index) => {
    //todo set id to delete files from api
    // valueFromAction.filter((i) => i.id !== index)
  };
  const handleToDelete = deleteWithApi
    ? handleToDeleteWithAPI
    : handleToDeleteWithoutAPI;
  // Pagination logic

  const handlePageChange = (newPage) => {
    getRemoteRows(currentPage * state.take, state.totalCount - state.take);
    setCurrentPage(newPage);

    //loadData(state, dataSourceAPI, getAction, cache, updateRows, dispatch);
    //setCurrentvalueFromAction(valueFromAction.slice(state.skip, state.take));
  };

  return (
    <div className={stylesFile.container}>
      <div className={stylesFile.gridContainer}>
        {state?.rows
          .map((row) => {
            return {
              ...row,
              displayFile: `${baseURLWithoutApi}/${row.displayFile}`,
              fileCodeNumber: row.fileCodeNumber === 0 ? "image" : "video",
            };
          })
          .map((photo, i) => (
            <div
              key={i}
              title={title || "imf"}
              className={stylesFile.validFile}
            >
              <div className={stylesFile.fileControls + " !justify-end"}>
                <MdDelete
                  onClick={() => handleDelete(photo.id, true)}
                  className={stylesFile.deleteIcon}
                  size={24}
                />
              </div>
              <TypeFile
                file={photo.displayFile}
                title={title}
                type={photo.fileCodeNumber}
              />
            </div>
          ))}
        {currentFiles.map((photo, i) => (
          <div key={i} title={title || "imf"} className={stylesFile.fileItem}>
            <div className={stylesFile.fileControls}>
              <CheckBox
                value={selectedFiles.includes(photo)}
                onValueChanged={() => handleCheckboxChange(photo)}
              />
              <MdDelete
                onClick={() => handleDelete(photo.id, false)}
                className={stylesFile.deleteIcon}
                size={24}
              />
            </div>
            <TypeFile file={photo.file} title={title} type={photo.type} />
          </div>
        ))}
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          <label htmlFor="Logo" className={stylesFile.label}>
            <ImageParameterWithPanelActions
              fieldName={fieldName || "image"}
              addFile={addFileActions}
              isFileContainer={true}
              enable={true}
              allowDrop={false}
              onChange={() => {}}
              title={title}
            />
            <input
              onChange={handleImage}
              id="Logo"
              name="Logo"
              type="file"
              className={stylesFile.hiddenInput}
              multiple
            />
          </label>
        </div>
      </div>
      <div className={stylesFile.pagination}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={stylesFile.paginationButton + " pop "}
        >
          {local.pagination.buttonPrevious}
        </Button>
        <span className="mx-4">
          {local.pagination.page} {currentPage} {local.pagination.of}{" "}
          {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={stylesFile.paginationButton + " pop "}
        >
          {local.pagination.buttonNext}
        </Button>
      </div>
      <DeleteItem
        id={deleteID}
        // action={}
        deleteWithApi={deleteWithApi}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        DeleteItemCallback={handleToDelete}
      />
    </div>
  );
}

export default FileInput;
