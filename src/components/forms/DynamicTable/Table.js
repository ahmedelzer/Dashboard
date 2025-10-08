import { useState } from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import { defaultProjectProxyRouteWithoutBaseURL } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { GetActionsFromSchemaAction } from "../../hooks/DashboardAPIs/GetActionsFromSchemaAction";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import Popup from "../DynamicPopup/Popup";
import PopupEditing from "../DynamicPopup/PopupEditing";
import BaseTable from "./BaseTable";
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
  selectedRow,
}) => {
  const {
    data: SchemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRouteWithoutBaseURL
  );
  schemaActions = schemaActions ? schemaActions : SchemaActions;
  const {
    getAction,
    postAction,
    putAction,
    deleteAction,
    wsAction,
    specialActions,
  } = GetActionsFromSchemaAction(schemaActions);

  const PopupComponentTable = ({ state }) => {
    return (
      <PopupEditing
        popupComponent={Popup}
        putAction={putAction}
        postAction={postAction}
        state={state}
        // setResult={setResult}
        // result={result}
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
        specialActions={specialActions}
        isSearchingTable={isSearchingTable}
        setSelectedRow={setSelectedRow}
        paging={paging}
        setPanelOpen={setPanelOpen}
        popupComponent={PopupComponent ? PopupComponent : PopupComponentTable}
        getAction={getAction}
        wsAction={wsAction}
        selection={selection}
        setSelection={setSelection}
        addSelectedList={addSelectedList}
        // trigger={trigger}
        refreshData={refreshData}
        rowDetails={rowDetails}
        subSchemas={subSchemas}
        selectedRow={selectedRow}
      />
    </div>
  );
};
export default DynamicTable;
