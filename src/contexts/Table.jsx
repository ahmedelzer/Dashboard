import { createContext, useState } from "react";
import { GetActionsFromSchema } from "../components/hooks/DashboardAPIs/GetActionsFromSchema";
//context
export const TableContext = createContext();

const TableProvider = ({ children, schemas }) => {
  const mainSchema = schemas?.find((item) => item.isMainSchema);
  const subSchemas = schemas?.filter((item) => !item.isMainSchema);

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
    <TableContext.Provider
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
    </TableContext.Provider>
  );
};

export default TableProvider;
