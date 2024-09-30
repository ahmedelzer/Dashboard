import React, { useContext, useEffect, useState } from "react";
import FileInput from "../PartingFrom/FileInput";
import { Button } from "reactstrap";
import DuringTransactionContainer from "../PartingFrom/DuringTransactionContainer";
import { IsSecondListSubsetOfFirstList } from "../PartingFrom/IsSecondListSubsetOfFirstList";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { defaultProjectProxyRoute, SetReoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { LanguageContext } from "../../../contexts/Language";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import StaticFilesModel from "../PartingFrom/fileInput/StaticFilesModel";
import FilesWithScrollPaging from "../PartingFrom/fileInput/FilesWithScrollPaging";
import FilesWithButtonPaging from "../PartingFrom/fileInput/FilesWithButtonPaging";
import { stylesFile } from "../PartingFrom/styles";
import { FaFileCirclePlus } from "react-icons/fa6";
import Loading from "../../loading/Loading";
function FileContainer({
  parentSchemaParameters,
  schema,
  row,
  fieldName,
  title,
  serverSchema,
}) {
  const { localization } = useContext(LanguageContext);

  // const schema =
  //   schemas &&
  //   schemas?.find((schema) => schema.schemaType === "FilesContainer");
  // console.log(schema);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [proxyRoute, setProxyRoute] = useState("");
  const [selectedServerFiles, setSelectedServerFiles] = useState([]);
  const [automated, setAutomated] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [selectPostAction, setSelectPostAction] = useState({});
  const [modalFileIsOpen, setModalFileIsOpen] = useState(false);
  const idField = schema.idField;
  const fileFieldNameButtonPaging = schema.dashboardFormSchemaParameters.find(
    (field) => field.parameterType === "imagePath"
  )?.parameterField;
  const fileFieldNameScrollPaging =
    serverSchema.dashboardFormSchemaParameters.find(
      (field) => field.parameterType === "image"
    )?.parameterField;
  //here
  const RefreshFiles = () => {
    setTrigger((prevTrigger) => prevTrigger + 1); // Increment trigger
  };
  const [selectedFilesContext, setSelectedFilesContext] = useState([]);
  const [open, setOpen] = useState(false);
  const schemaWithoutID = schema.dashboardFormSchemaParameters.filter(
    (schema) => !schema.isIDField
  );
  // const { getActionSchema, postActionSchema, deleteActionSchema } =
  //   GetActionsFromSchema(schema);
  // const {
  //   getAction: getActionSchema,
  //   postAction: postActionSchema,
  //   deleteAction: deleteActionSchema,
  // } = GetActionsFromSchema(schema);
  const {
    getAction: getActionServerSchema,
    postAction: postActionServerSchema,
    deleteAction: deleteActionServerSchema,
  } = GetActionsFromSchema(serverSchema);
  const isSubset = IsSecondListSubsetOfFirstList(
    parentSchemaParameters,
    schemaWithoutID,
    ["parameterField"]
  );

  function handleUpload(postAction, containerSelectedFiles, route) {
    setSelectPostAction(postAction);
    if (containerSelectedFiles.length > 0) {
      setSelectedFilesContext(containerSelectedFiles);
      setProxyRoute(route);
    }
    setOpen(!isSubset);
    setAutomated(isSubset);
    setSelectedFiles([]);
    setSelectedServerFiles([]);
  }
  // subset checking
  const {
    getAction: getActionSchema,
    postAction: postActionSchema,
    deleteAction: deleteActionSchema,
  } = GetActionsFromSchema(schema);
  return (
    <div>
      <div className={stylesFile.parentFileContainer} key={trigger}>
        <div className={stylesFile.container}>
          {selectedFilesContext.length > 0 && <Loading />}
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
          <div className={stylesFile.buttonsContainer}>
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
                onClick={() => {
                  handleUpload(
                    postActionSchema,
                    selectedServerFiles,
                    schema.projectProxyRoute
                  );
                }}
              >
                {localization.fileContainer.textButtonUploadValue}
              </Button>
            )}
          </div>
          <FilesWithScrollPaging
            title={title}
            idField={serverSchema.idField}
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
      <DuringTransactionContainer
        tableSchema={schema.dashboardFormSchemaParameters}
        TransformDone={RefreshFiles}
        automated={automated}
        selectionContext={selectedFilesContext}
        open={open}
        setOpen={setOpen}
        proxyRoute={proxyRoute}
        action={selectPostAction}
        setSelectionContext={setSelectedFilesContext}
      />
    </div>
  );
}

export default FileContainer;
