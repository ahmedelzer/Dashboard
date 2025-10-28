import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "./GetSchemaActionsUrl";
import {
  defaultProjectProxyRoute,
  defaultProjectProxyRouteWithoutBaseURL,
} from "../../../request";

export function GetActionsFromSchema(schema) {
  const {
    data: schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(schema.dashboardFormSchemaID),
    defaultProjectProxyRouteWithoutBaseURL
  );

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
  const wsAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "ws"
  );
  const specialActions = schemaActions
    ?.filter((action) =>
      ["Get", "Put", "Post", "Delete"].some((method) =>
        action.dashboardFormActionMethodType.startsWith(`${method}:`)
      )
    )
    ?.map((action) => ({
      ...action,
      confirm: action.dashboardFormActionMethodType.startsWith("Put:"), // only true for Delete
    }));

  return {
    getAction,
    postAction,
    putAction,
    deleteAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
    specialActions,
    wsAction,
    error,
    isLoading,
  };
}
