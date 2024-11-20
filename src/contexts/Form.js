import React, { useState, createContext } from "react";
import { GetActionsFromSchema } from "../components/hooks/DashboardAPIs/GetActionsFromSchema";
import { useSearchParams } from "react-router-dom";
//context
export const FormContext = createContext();

const Form = ({ children, schemas }) => {
  const mainSchema = schemas.find((item) => item?.isMainSchema === true);
  const subSchemas = schemas.filter((item) => item.isMainSchema !== true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actionsForm, setActionsForm] = useState(null);
  const {
    getAction,
    postAction,
    putAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
  } = GetActionsFromSchema(mainSchema);

  return (
    <FormContext.Provider
      value={{
        getAction,
        postAction,
        putAction,
        searchAction,
        getDependenciesAction,
        getActionByID,
        selectedRow,
        setSelectedRow,
        mainSchema,
        actionsForm,
        setActionsForm,
        subSchemas,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default Form;
