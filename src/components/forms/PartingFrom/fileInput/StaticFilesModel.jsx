import React, { useContext, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CheckBox } from "devextreme-react/check-box";
import { ImageParameterWithPanelActions } from "../../../inputs";
import convertImageToBase64 from "../../../inputs/InputActions/ConvertImageToBase64";
import { LanguageContext } from "../../../../contexts/Language";
import { stylesFile } from "../styles";
import TypeFile from "../TypeFile";
import DeleteItem from "../DeleteItem";

function StaticFilesModel({
  modalFileIsOpen,
  setModalFileIsOpen,
  setSelectedFiles,
  title,
  fieldName,
  row,
  handleUpload,
  selectedFiles,
  postAction,
  proxyRoute,
}) {
  const { localization } = useContext(LanguageContext);

  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(false);
  const [deleteWithApi, setDeleteWithApi] = useState(false);
  const [Files, setFiles] = useState([]);
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
    setModalDeleteIsOpen(true);
  };

  const handleToDeleteWithoutAPI = (index) => {
    setFiles((prevFiles) => prevFiles.filter((i) => i.id !== index));
    setSelectedFiles((prevSelected) =>
      prevSelected.filter((i) => i.id !== index)
    );
  };
  function handleAddMore() {
    handleUpload();
    setFiles([]);
    setModalFileIsOpen(false);
  }
  return (
    <div>
      <Modal isOpen={modalFileIsOpen} size="lg">
        <ModalHeader>{localization.webcam.modal.header}</ModalHeader>
        <ModalBody>
          <div className={stylesFile.fileListContainer}>
            {Files?.map((photo, i) => (
              <div
                key={i}
                title={title || "imf"}
                className={stylesFile.fileScroll}
              >
                <div className={stylesFile.fileControls}>
                  <CheckBox
                    value={selectedFiles.includes(photo)}
                    onValueChanged={() => handleCheckboxChange(photo)}
                  />
                  <IoCloseCircleSharp
                    onClick={() => handleDelete(photo.id, false)}
                    className={stylesFile.deleteIcon}
                    size={24}
                  />
                </div>
                <TypeFile file={photo.file} title={title} type={photo.type} />
              </div>
            ))}
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
              <label
                htmlFor="fileContent"
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
                  id="fileContent"
                  name="fileContent"
                  type="file"
                  className={stylesFile.hiddenInput}
                  multiple
                />
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="pop"
            onClick={() => {
              setFiles([]);
              setModalFileIsOpen(false);
            }}
          >
            {localization.webcam.modal.button.cancel}
          </Button>
          <Button className="pop" onClick={handleAddMore}>
            {localization.webcam.modal.button.capture}
          </Button>
        </ModalFooter>
      </Modal>
      <DeleteItem
        id={deleteID}
        modalIsOpen={modalDeleteIsOpen}
        setModalIsOpen={setModalDeleteIsOpen}
        DeleteItemCallback={handleToDeleteWithoutAPI}
        deleteWithApi={deleteWithApi}
      />
    </div>
  );
}

export default StaticFilesModel;
