import React, { useContext, useEffect, useState } from "react";
// import FileInput from "../PartingFrom/FileInput";
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
  const {
    getAction: getActionSchema,
    postAction: postActionSchema,
    deleteAction: deleteActionSchema,
  } = GetActionsFromSchema(schema);
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

  const handleUpload = (postAction) => {
    setSelectPostAction(postAction);

    if (selectedFiles.length > 0) {
      setSelectedFilesContext(selectedFiles);
    } else if (selectedServerFiles.length > 0) {
      setSelectedFilesContext(selectedServerFiles);
    }
    setOpen(!isSubset);
    setAutomated(isSubset);
    setSelectedFiles([]);
    setSelectedServerFiles([]);
  };
  // subset checking

  return (
    <div>
      {/* {postAction && (
        <Button className={"pop my-2"} onClick={handleUpload}>
          {localization.fileContainer.textButtonUploadValue}
        </Button>
      )} */}
      <div className="border rounded mb-2">
        <div className={stylesFile.container} key={trigger}>
          <StaticFilesModel
            modalFileIsOpen={modalFileIsOpen}
            setModalFileIsOpen={setModalFileIsOpen}
            setSelectedFiles={setSelectedFiles}
            title={title}
            fieldName={fieldName}
            row={row}
            postAction={postActionServerSchema}
            handleUpload={handleUpload}
            selectedFiles={selectedFiles}
          />
          <div className="flex justify-between my-2">
            {postActionServerSchema && (
              <Button className="pop" onClick={() => setModalFileIsOpen(true)}>
                add more
              </Button>
            )}
            {postActionSchema && (
              <Button
                className={"pop"}
                onClick={() => handleUpload(postActionSchema)}
              >
                {localization.fileContainer.textButtonUploadValue}
              </Button>
            )}
          </div>
          <FilesWithScrollPaging
            title={title}
            idField={idField}
            row={row}
            getAction={getActionServerSchema}
            selectedServerFiles={selectedServerFiles}
            setSelectedServerFiles={setSelectedServerFiles}
            fileFieldName={fileFieldNameScrollPaging}
          />
          <FilesWithButtonPaging
            title={title}
            idField={idField}
            row={row}
            getAction={getActionSchema}
            deleteAction={deleteActionSchema}
            handleToDelete={handleUpload}
            fileFieldName={fileFieldNameButtonPaging}
          />
        </div>
        {/* <FileInput
          key={trigger}
          fieldName={fieldName}
          row={row}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          title={title}
          getActionServerSchema={getActionServerSchema}
          idField={schema.idField}
          handleToDeleteWithAPI={RefreshFiles}
          deleteActionServerSchema={deleteActionServerSchema}
          handleUpload={handleUpload}
          schema={schema}
        /> */}
      </div>
      <DuringTransactionContainer
        tableSchema={schema.dashboardFormSchemaParameters}
        TransformDone={RefreshFiles}
        automated={automated}
        selectionContext={selectedFilesContext}
        open={open}
        setOpen={setOpen}
        action={selectPostAction}
        setSelectionContext={setSelectedFilesContext}
      />
    </div>
  );
}

export default FileContainer;
