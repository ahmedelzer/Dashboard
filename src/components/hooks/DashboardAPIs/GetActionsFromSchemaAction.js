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
    specialActions,
    wsAction,
  };
}
