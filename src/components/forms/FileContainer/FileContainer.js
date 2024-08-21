import React, { useState } from "react";
import FileInput from "../PartingFrom/FileInput";

function FileContainer({ schema, row, value, fieldName, ...props }) {
  //   const [selectedFiles, setSelectedFiles] = useState([]);

  // const {
  //   data: schemaActions,
  //   error,
  //   isLoading,
  // } = useFetch(
  //   GetSchemaActionsUrl(schema.dashboardFormSchemaID),
  //   defaultProjectProxyRoute
  //   // trigger
  // );
  // SetReoute(schema.projectProxyRoute);

  // const getAction =
  //   schemaActions &&
  //   schemaActions.find(
  //     (action) => action.dashboardFormActionMethodType === "Get"
  //   );
  // const postAction =
  //   schemaActions &&
  //   schemaActions.find(
  //     (action) => action.dashboardFormActionMethodType === "Post"
  //   );
  // const deleteAction =
  //   schemaActions &&
  //   schemaActions.find(
  //     (action) => action.dashboardFormActionMethodType === "Delete"
  //   );
  return (
    <div>
      <FileInput
        schema={schema}
        row={row}
        value={value}
        fieldName={fieldName}
      />
    </div>
  );
}

export default FileContainer;
