export function GetActionsFromSchemaAction(schemaActions) {
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
  const wsAction = schemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "ws"
  );
  const specialActions = schemaActions?.filter((action) =>
    ["Put", "Post", "Delete"].some((method) =>
      action.dashboardFormActionMethodType.startsWith(`${method}:`)
    )
  );
  return {
    getAction,
    postAction,
    putAction,
    deleteAction,
    specialActions,
    wsAction,
  };
}
