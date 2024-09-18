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
  const deleteAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Delete"
  );

  return { getAction, postAction, putAction, deleteAction, error, isLoading };
}
