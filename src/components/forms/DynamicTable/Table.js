import React, { useState } from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import { SetReoute, defaultProjectProxyRoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import Popup from "../DynamicPopup/Popup";
import PopupEditing from "../DynamicPopup/PopupEditing";
import BaseTable from "./BaseTable";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import { GetActionsFromSchemaAction } from "../../hooks/DashboardAPIs/GetActionsFromSchemaAction";
const DynamicTable = ({
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
  const [result, setResult] = useState({}); //that is make re-render to the rows

  const {
    data: SchemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );
  schemaActions = schemaActions ? schemaActions : SchemaActions;
  SetReoute(schema.projectProxyRoute);
  const { getAction, postAction, putAction, deleteAction, specialActions } =
    GetActionsFromSchemaAction(schemaActions);

  const PopupComponentTable = ({ state }) => {
    return (
      <PopupEditing
        popupComponent={Popup}
        putAction={putAction}
        postAction={postAction}
        state={state}
        setResult={setResult}
        result={result}
        proxyRoute={schema.projectProxyRoute}
        schema={schema}
        addSelectedList={addSelectedList}
        specialActions={specialActions}
      />
    );
  };

  return (
    <div>
      <BaseTable
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
        popupComponent={PopupComponent ? PopupComponent : PopupComponentTable}
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
export default DynamicTable;
