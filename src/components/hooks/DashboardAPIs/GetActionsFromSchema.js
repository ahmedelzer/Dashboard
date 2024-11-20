import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "./GetSchemaActionsUrl";
import { defaultProjectProxyRoute, SetReoute } from "../../../request";

export function GetActionsFromSchema(schema) {
  const {
    data: schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );
  SetReoute(schema.projectProxyRoute);

  const getAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );
  const postAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Post"
  );
  const putAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Put"
  );
  const searchAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Search"
  );
  const getDependenciesAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "GetDependencies"
  );
  const getActionByID = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "GetByID"
  );
  const deleteAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Delete"
  );

  return {
    getAction,
    postAction,
    putAction,
    deleteAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
    error,
    isLoading,
  };
}
