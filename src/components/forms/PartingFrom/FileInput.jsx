import React, { useState } from "react";
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
function FileInput({
  schema,
  row,
  value,
  selectedFiles,
  setSelectedFiles,
  fieldName,
  ...props
}) {
  const [Files, setFiles] = useState(value || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let valueFromAction = [
    {
      file: "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
      type: "image",
    },
  ];
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

  const addFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64Data = reader.result;
      const [, base64String] = base64Data.split(";base64,");
      setFiles((prevFiles) => [
        ...prevFiles,
        { file: file, base64: base64String, id: prevFiles.length },
      ]);
    };
  };
  const addFileActions = async (path, type) => {
    try {
      const base64String = await convertImageToBase64(path);
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          file: path,
          base64: base64String,
          id: prevFiles.length,
          type: type,
        },
      ]);
      return base64String;
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
      return null;
    }
  };
  const OnChange = async (e) => {
    const { name, value, type } = e?.target;
    console.log(e?.target, "?.target");
    // // Assuming PrepareInputValue is an asynchronous function you have defined elsewhere
    // const valueAfterPreparing = await PrepareInputValue(type, value);

    // const newParam = { [name]: valueAfterPreparing,["path"]:value };

    // setFiles([...Files, { ...newParam }]);
  };
  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(file)
        ? prevSelected.filter((i) => i !== file)
        : [...prevSelected, file]
    );
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((i) => i !== index));
    setSelectedFiles((prevSelected) => prevSelected.filter((i) => i !== index));
  };
  // Pagination logic
  const indexOfLastFile = currentPage * itemsPerPage;
  const indexOfFirstFile = indexOfLastFile - itemsPerPage;
  const currentFiles = Files.slice(indexOfFirstFile, indexOfLastFile);
  const currentvalueFromAction = valueFromAction.slice(
    indexOfFirstFile,
    indexOfLastFile
  );
  const totalPages = Math.ceil(Files.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  console.log("====================================");
  console.log(Files, selectedFiles);
  console.log("====================================");
  return (
    <div className={stylesFile.container}>
      <div className={stylesFile.gridContainer}>
        {currentvalueFromAction.map((photo, i) => (
          <div
            key={i}
            title={fieldName || "imf"}
            className={stylesFile.validFile}
          >
            <div className={stylesFile.fileControls + "justify-end"}>
              <MdDelete
                onClick={() => handleDelete(photo.id)}
                className={stylesFile.deleteIcon}
                size={24}
              />
            </div>
            <TypeFile file={photo.file} type={photo.type} />
          </div>
        ))}
        {currentFiles.map((photo, i) => (
          <div
            key={i}
            title={fieldName || "imf"}
            className={stylesFile.fileItem}
          >
            <div className={stylesFile.fileControls}>
              <CheckBox
                value={selectedFiles.includes(photo)}
                onValueChanged={() => handleCheckboxChange(photo)}
              />
              <MdDelete
                onClick={() => handleDelete(photo)}
                className={stylesFile.deleteIcon}
                size={24}
              />
            </div>
            <TypeFile file={photo.file} type={photo.type} />
          </div>
        ))}
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          <label htmlFor="Logo" className={stylesFile.label}>
            <ImageParameterWithPanelActions
              fieldName={fieldName || "image"}
              title={"Image"}
              // addFile={addFileActions}
              isFileContainer={true}
              enable={true}
              onChange={OnChange}
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
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={stylesFile.paginationButton}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={stylesFile.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FileInput;
