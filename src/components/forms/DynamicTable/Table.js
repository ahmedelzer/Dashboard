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
  rowDetails = {},
  subSchemas,
  selectedRow,
}) => {
  const {
    data: _schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRouteWithoutBaseURL,
  );
  schemaActions = schemaActions ? schemaActions : _schemaActions;
  const {
    getAction,
    postAction,
    putAction,
    deleteAction,
    wsAction,
    specialActions,
  } = GetActionsFromSchemaAction(_schemaActions);

  const PopupComponentTable = ({ state, dispatch }) => {
    return (
      <PopupEditing
        popupComponent={Popup}
        putAction={putAction}
        postAction={postAction}
        state={state}
        dispatch={dispatch}
        rowDetails={rowDetails}
        // setResult={setResult}
        // result={result}
        proxyRoute={schema.projectProxyRoute}
        schema={schema}
        subSchemas={subSchemas}
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
