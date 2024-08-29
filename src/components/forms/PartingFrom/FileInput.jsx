import React, { useEffect, useMemo, useReducer, useState } from "react";
import { CheckBox } from "devextreme-react/check-box";
import { ImageParameterWithPanelActions } from "../../inputs";
import { MdDelete } from "react-icons/md";
import TypeFile from "./TypeFile";
import { stylesFile } from "./styles";
import convertImageToBase64 from "../../inputs/InputActions/ConvertImageToBase64";
import { Button } from "reactstrap";
import DeleteItem from "./DeleteItem";
import { baseURLWithoutApi } from "../../../request";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import { createRowCache } from "@devexpress/dx-react-grid";
import { loadData } from "../../hooks/APIsFunctions/loadData";
import local from "../../../locals/EN/fileContainer.json";

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

function FileInput({
  row,
  value,
  selectedFiles,
  setSelectedFiles,
  fieldName,
  title,
  getAction,
}) {
  const [Files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteWithApi, setDeleteWithApi] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default for large screens
  // Function to update items per page based on screen width
  const { [fieldName]: _, ...rowWithoutFieldName } = row;
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
      pageIndex: skip / take + 1,
      pageSize: take,
      ...row,
    });

  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE), []);

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

  // Load data whenever skip or take state changes
  useEffect(() => {
    loadData(state, dataSourceAPI, getAction, cache, updateRows, dispatch);
  });
  const filesFromAPI = state.rows?.map((row) => ({
    ...row,

    displayFile: `${baseURLWithoutApi}/${row.displayFile}`,
    fileCodeNumber: row.fileCodeNumber === 0 ? "image" : "video",
  }));
  const indexOfLastFile = currentPage * itemsPerPage;
  const indexOfFirstFile = indexOfLastFile - itemsPerPage;
  const currentFiles = filesFromAPI.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(state.totalCount / itemsPerPage);

  const handlePageChange = (newPage) => {
    getRemoteRows(indexOfFirstFile + 1, indexOfLastFile * 2);
    setCurrentPage(newPage);
  };

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

  const addFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const [, base64String] = reader.result.split(";base64,");
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          file: file,
          [fieldName]: base64String,
          id: prevFiles.length,
          ...rowWithoutFieldName,
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
  };

  const handleToDeleteWithoutAPI = (index) => {
    setFiles((prevFiles) => prevFiles.filter((i) => i.id !== index));
    setSelectedFiles((prevSelected) =>
      prevSelected.filter((i) => i.id !== index)
    );
  };

  const handleToDeleteWithAPI = (index) => {
    // Logic for deleting with API
  };

  const handleToDelete = deleteWithApi
    ? handleToDeleteWithAPI
    : handleToDeleteWithoutAPI;

  return (
    <div className={stylesFile.container}>
      <div className={stylesFile.fileListContainer}>
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          <label
            htmlFor="Logo"
            className={stylesFile.fileScroll + " !border-0"}
          >
            <ImageParameterWithPanelActions
              fieldName={fieldName || "image"}
              addFile={addFileActions}
              isFileContainer={true}
              enable={true}
              allowDrop={false}
              title={title}
              onChange={() => {}}
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
        {Files?.map((photo, i) => (
          <div key={i} title={title || "imf"} className={stylesFile.fileScroll}>
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
      </div>

      <div className={stylesFile.gridContainer}>
        {currentFiles.map((photo, i) => (
          <div key={i} title={title || "imf"} className={stylesFile.validFile}>
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
      </div>

      <div className={stylesFile.pagination}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={stylesFile.paginationButton + " pop"}
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
          className={stylesFile.paginationButton + " pop"}
        >
          {local.pagination.buttonNext}
        </Button>
      </div>
      <DeleteItem
        deleteIsOpen={modalIsOpen}
        setDeleteIsOpen={setModalIsOpen}
        deleteFunction={handleToDelete}
      />
    </div>
  );
}

export default FileInput;
