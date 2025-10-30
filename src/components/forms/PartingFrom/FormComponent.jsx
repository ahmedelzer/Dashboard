import React, { useContext, useEffect, useState } from "react";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import FormContainer from "../DynamicPopup/FormContainer";
import { FormContext } from "../../../contexts/Form";
import EditFormToggle from "../DynamicPopup/EditFormToggle";
import { stylesFile } from "../DynamicPopup/styles";
import { useWS } from "../../../contexts/WSContext";
import { ConnectToWS } from "../../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../../utils/WS/handleWSMessage";
import testSchemaAction from "../Test/testSchemaAction.json";
function FormComponent({ tableSchema, ...props }) {
  const { mainSchema, selectedRow, dependenceRow, setDependenceRow } =
    useContext(FormContext);
  const {
    getAction,
    postAction,
    putAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
    wsAction,
    specialActions,
  } = GetActionsFromSchema(tableSchema);
  const [formRow, setFormRow] = useState(props.row);
  const { _wsMessageForm, setWSMessageForm } = useWS();
  const [WS_Connected, setWS_Connected] = useState(false);
  const actions = {
    getAction,
    postAction,
    putAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
    specialActions,
  };

  const { actionsForm } = useContext(FormContext);
  const [edit, setEdit] = useState(props.editInitState || false);
  //WS
  useEffect(() => {
    setWS_Connected(false);
  }, []);
  // 🌐 Setup WebSocket connection on mount or WS_Connected change
  useEffect(() => {
    // if (WS_Connected||wsAction=) return;
    let cleanup;
    ConnectToWS(setWSMessageForm, setWS_Connected, {}, wsAction && wsAction)
      .then(() => console.log("🔌 WebSocket setup done"))
      .catch((e) => {
        console.error("❌ Cart WebSocket error", e);
      });
    return () => {
      if (cleanup) cleanup(); // Clean up when component unmounts or deps change
      console.log("🧹 Cleaned up WebSocket handler");
    };
  }, [WS_Connected, wsAction]);

  // 🧠 Reducer callback to update rows
  const callbackReducerUpdate = async (ws_updatedRows) => {
    setFormRow(ws_updatedRows.rows[0]);
  };
  const fieldsType = {
    idField: tableSchema.idField,
    dataSourceName:
      tableSchema.dataSourceName || tableSchema.idField || "nodeMenuItemID",
  };

  // 📨 React to WebSocket messages only when valid
  useEffect(() => {
    if (!_wsMessageForm) return;
    const _handleWSMessage = new WSMessageHandler({
      _WSsetMessage: _wsMessageForm,
      fieldsType,
      rows: [props.row],
      totalCount: 1,
      callbackReducerUpdate,
    });
    _handleWSMessage.process();
    setWSMessageForm(_wsMessageForm);
  }, [_wsMessageForm]);
  useEffect(() => {
    setFormRow(props.row);
  }, [props.row]);
  return (
    <div>
      {actions && (
        <EditFormToggle edit={edit} setEdit={setEdit} actions={actions} />
      )}

      <div className={stylesFile.formEditState(edit)} key={props.row}>
        <FormContainer
          tableSchema={tableSchema}
          specialActions={specialActions}
          setDependenceRow={setDependenceRow}
          {...props}
          row={formRow}
        />
      </div>
    </div>
  );
}

export default FormComponent;
