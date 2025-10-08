import React, { useState } from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import { defaultProjectProxyRoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import BaseTree from "./BaseTree";
import { GetActionsFromSchemaAction } from "../../hooks/DashboardAPIs/GetActionsFromSchemaAction";
const Tree = ({
  schema,
  isSearchingTable,
  setSelectedRow = false,
  paging,
  setPanelOpen,
  selectionRow,
  addMessage = true,
  editMessage = true,
  deleteMessage = false,
  selection,
  setSelection,
  addSelectedList = false,
  PopupComponent = false,
  schemaActions = false,
  refreshData,
  rowDetails = false,
  subSchemas,
}) => {
  const [result, setResult] = useState({});

  const {
    data: SchemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    schema.projectProxyRoute
  );
  schemaActions = schemaActions ? schemaActions : SchemaActions;
  const { getAction, postAction, putAction, deleteAction } =
    GetActionsFromSchemaAction(schemaActions);

  //   const PopupComponentTable = ({ state }) => {
  //     return (
  //       <PopupEditing
  //         popupComponent={Popup}
  //         putAction={putAction}
  //         postAction={postAction}
  //         state={state}
  //         setResult={setResult}
  //         result={result}
  //         proxyRoute={schema.projectProxyRoute}
  //         schema={schema}
  //         addSelectedList={addSelectedList}
  //       />
  //     );
  //   };

  return (
    <div>
      <BaseTree
        key={schema.idField}
        schema={schema}
        selectionRow={selectionRow}
        addMessage={addMessage && postAction}
        editMessage={editMessage && putAction}
        deleteMessage={deleteMessage && deleteAction}
        isSearchingTable={isSearchingTable}
        setSelectedRow={setSelectedRow}
        paging={paging}
        setPanelOpen={setPanelOpen}
        // popupComponent={PopupComponent ? PopupComponent : PopupComponentTable}
        getAction={getAction}
        selection={selection}
        setSelection={setSelection}
        addSelectedList={addSelectedList}
        // trigger={trigger}
        refreshData={refreshData}
        rowDetails={rowDetails}
        subSchemas={subSchemas}
      />
    </div>
  );
};
export default Tree;
