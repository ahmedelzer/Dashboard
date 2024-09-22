import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { stylesFile } from "./styles";

import FilesWithButtonPaging from "./fileInput/FilesWithButtonPaging";
import FilesWithScrollPaging from "./fileInput/FilesWithScrollPaging";
import StaticFilesModel from "./fileInput/StaticFilesModel";
import { LanguageContext } from "../../../contexts/Language";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import { FaFileCirclePlus } from "react-icons/fa6";

function FileInput({
  row,
  selectedFiles,
  setSelectedFiles,
  postActionServerSchema,
  title,
  getActionServerSchema,
  idField,
  handleUpload,
  schema,
  serverSchema,
}) {
  const { localization } = useContext(LanguageContext);
  const [selectedServerFiles, setSelectedServerFiles] = useState([]);
  const [modalFileIsOpen, setModalFileIsOpen] = useState(false);
  const fileFieldNameButtonPaging = schema.dashboardFormSchemaParameters.find(
    (field) => field.parameterType === "imagePath"
  )?.parameterField;
  const fileFieldNameScrollPaging =
    serverSchema.dashboardFormSchemaParameters.find(
      (field) => field.parameterType === "image"
    )?.parameterField;
  const {
    getAction: getActionSchema,
    postAction: postActionSchema,
    deleteAction: deleteActionSchema,
  } = GetActionsFromSchema(schema);
  return (
    <div className="border rounded mb-2">
      <div className={stylesFile.container}>
        <StaticFilesModel
          modalFileIsOpen={modalFileIsOpen}
          setModalFileIsOpen={setModalFileIsOpen}
          setSelectedFiles={setSelectedFiles}
          title={title}
          fieldName={fileFieldNameScrollPaging}
          row={row}
          postAction={postActionServerSchema}
          handleUpload={() =>
            handleUpload(
              postActionServerSchema,
              selectedFiles,
              serverSchema.projectProxyRoute
            )
          }
          selectedFiles={selectedFiles}
        />
        <div className="flex justify-end my-2">
          {postActionServerSchema && (
            <Button
              className="pop mx-2"
              onClick={() => setModalFileIsOpen(true)}
            >
              <FaFileCirclePlus size={22} />
            </Button>
          )}
          {postActionSchema && (
            <Button
              className={"pop"}
              onClick={() =>
                handleUpload(
                  postActionSchema,
                  selectedServerFiles,
                  schema.projectProxyRoute
                )
              }
            >
              {localization.fileContainer.textButtonUploadValue}
            </Button>
          )}
        </div>
        <FilesWithScrollPaging
          title={title}
          idField={idField}
          row={row}
          proxyRoute={serverSchema.projectProxyRoute}
          getAction={getActionServerSchema}
          selectedServerFiles={selectedServerFiles}
          setSelectedServerFiles={setSelectedServerFiles}
          fileFieldName={fileFieldNameScrollPaging}
        />
        <FilesWithButtonPaging
          proxyRoute={schema.projectProxyRoute}
          title={title}
          idField={idField}
          row={row}
          getAction={getActionSchema}
          deleteAction={deleteActionSchema}
          handleToDelete={handleUpload}
          fileFieldName={fileFieldNameButtonPaging}
        />
      </div>
    </div>
  );
}

export default FileInput;
