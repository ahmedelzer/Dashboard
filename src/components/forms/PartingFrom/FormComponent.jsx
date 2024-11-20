import React, { useContext, useEffect, useState } from "react";
import { GetActionsFromSchema } from "../../hooks/DashboardAPIs/GetActionsFromSchema";
import FormContainer from "../DynamicPopup/FormContainer";
import { FormContext } from "../../../contexts/Form";
import EditFormToggle from "../DynamicPopup/EditFormToggle";
import { stylesFile } from "../DynamicPopup/styles";

function FormComponent({ tableSchema, ...props }) {
  const {
    getAction,
    postAction,
    putAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
  } = GetActionsFromSchema(tableSchema);
  const actions = {
    getAction,
    postAction,
    putAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
  };
  const [edit, setEdit] = useState(false);
  return (
    <div>
      {actions && (
        <EditFormToggle edit={edit} setEdit={setEdit} actions={actions} />
      )}

      <div className={stylesFile.formEditState(edit)}>
        <FormContainer tableSchema={tableSchema} {...props} />;
      </div>
    </div>
  );
}

export default FormComponent;
