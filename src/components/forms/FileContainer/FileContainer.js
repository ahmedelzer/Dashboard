import React, { useState } from "react";
import FileInput from "../PartingFrom/FileInput";
import { Button } from "reactstrap";
import DuringTransactionContainer from "../PartingFrom/DuringTransactionContainer";
import { IsSecondListSubsetOfFirstList } from "../PartingFrom/IsSecondListSubsetOfFirstList";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { defaultProjectProxyRoute, SetReoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";

function FileContainer({
  parentSchemaParameters,
  schema,
  row,
  fieldName,
  title,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [automated, setAutomated] = useState([]);
  const [trigger, setTrigger] = useState(0);
  //here
  const RefreshFiles = () => {
    setTrigger((prevTrigger) => prevTrigger + 1); // Increment trigger
  };
  const [selectedFilesContext, setSelectedFilesContext] = useState([]);
  const [open, setOpen] = useState(false);
  const schemaWithoutID = schema.dashboardFormSchemaParameters.filter(
    (schema) => !schema.isIDField
  );
  const isSubset = IsSecondListSubsetOfFirstList(
    parentSchemaParameters,
    schemaWithoutID,
    ["parameterField"]
  );

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      setOpen(!isSubset);
      setSelectedFilesContext(selectedFiles);
      setAutomated(isSubset);
    }
  };
  // subset checking
  const {
    data: schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRoute
    // trigger
  );
  SetReoute(schema.projectProxyRoute);

  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const postAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  // const deleteAction = schemaActions.find(
  //   (action) => action.dashboardFormActionMethodType === "Delete"
  // );

  return (
    <div>
      <Button className={"pop my-2"} onClick={handleUpload}>
        upload
      </Button>
      <div className="border rounded mb-2">
        <FileInput
          key={trigger}
          fieldName={fieldName}
          row={row}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          title={title}
          getAction={getAction}
        />
      </div>
      <DuringTransactionContainer
        tableSchema={schema.dashboardFormSchemaParameters}
        TransformDone={RefreshFiles}
        automated={automated}
        selectionContext={selectedFilesContext}
        open={open}
        setOpen={setOpen}
        action={postAction}
      />
    </div>
  );
}

export default FileContainer;
