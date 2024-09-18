import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { stylesFile } from "./styles";

import FilesWithButtonPaging from "./fileInput/FilesWithButtonPaging";
import FilesWithScrollPaging from "./fileInput/FilesWithScrollPaging";
import StaticFilesModel from "./fileInput/StaticFilesModel";
import { LanguageContext } from "../../../contexts/Language";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";

function FileInput({
  row,
  selectedFiles,
  setSelectedFiles,
  fieldName,
  title,
  getActionServerSchema,
  idField,
  handleToDeleteWithAPI,
  deleteActionServerSchema,
  handleUpload,
  schema,
}) {
  const [modalFileIsOpen, setModalFileIsOpen] = useState(false);
  const { localization } = useContext(LanguageContext);
  const { getActionSchema, postActionSchema, deleteActionSchema } =
    GetActionsFromSchema(schema);
  const handleToDelete = handleToDeleteWithAPI;
  return (
    <div className={stylesFile.container}>
      <StaticFilesModel
        modalFileIsOpen={modalFileIsOpen}
        setModalFileIsOpen={setModalFileIsOpen}
        setSelectedFiles={setSelectedFiles}
        title={title}
        fieldName={fieldName}
        row={row}
        handleUpload={handleUpload}
        selectedFiles={selectedFiles}
      />
      <div className="flex justify-between my-2">
        <Button className="pop" onClick={() => setModalFileIsOpen(true)}>
          add more
        </Button>
        {/* {postAction && ( */}
        <Button className={"pop"} onClick={handleUpload}>
          {localization.fileContainer.textButtonUploadValue}
        </Button>
        {/* )} */}
      </div>
      <FilesWithScrollPaging
        title={title}
        idField={idField}
        row={row}
        getAction={getActionServerSchema}
      />
      <FilesWithButtonPaging
        title={title}
        idField={idField}
        row={row}
        getAction={getActionSchema}
        deleteAction={deleteActionSchema}
        handleToDelete={handleToDelete}
      />
    </div>
  );
}

export default FileInput;
