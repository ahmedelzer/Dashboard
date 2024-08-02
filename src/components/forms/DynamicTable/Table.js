import React, { useState, useReducer, useEffect, useMemo } from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import PopupEditing from "../DynamicPopup/PopupEditing";
import Popup from "../DynamicPopup/Popup";
import BaseTable from "./BaseTable";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { SetReoute, defaultProjectProxyRoute } from "../../../request";
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
}) => {
  const [result, setResult] = useState({});
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
  const putAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Put"
    );
  const PopupComponentTable = ({ state }) => {
    return (
      <PopupEditing
        popupComponent={Popup}
        putAction={putAction}
        postAction={postAction}
        state={state}
        setResult={setResult}
        result={result}
        schema={schema}
        addSelectedList={addSelectedList}
      />
    );
  };

  return (
    <div className="card">
      <BaseTable
        key={schema.idField}
        schema={schema}
        selectionRow={selectionRow}
        addMessage={addMessage}
        editMessage={editMessage}
        deleteMessage={deleteMessage}
        isSearchingTable={isSearchingTable}
        setSelectedRow={setSelectedRow}
        paging={paging}
        setPanelOpen={setPanelOpen}
        popupComponent={PopupComponent ? PopupComponent : PopupComponentTable}
        getAction={getAction}
        selection={selection}
        setSelection={setSelection}
        addSelectedList={addSelectedList}
      />
    </div>
  );
};
export default DynamicTable;
