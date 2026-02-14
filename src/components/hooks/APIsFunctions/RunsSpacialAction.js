import APIHandling from "./APIHandling";
import { GetProjectUrl } from "../../../request";
import { buildApiUrl } from "./BuildApiUrl";

export const RunsSpacialAction = async (
  name,
  id,
  value,
  actions,
  runWithPrams = false,
  row = {},
  setLoading = (o) => {},
) => {
  const action = actions.find(
    (ac) => ac.dashboardFormActionMethodType.split(":")[1] === name,
  );

  const actionWithRightNameAction = action
    ? {
        ...action,
        dashboardFormActionMethodType:
          action.dashboardFormActionMethodType.split(":")[0], // remove the ":name"
      }
    : null;

  if (action) {
    setLoading(true); // Disable the switch
    const getProjectUrl = GetProjectUrl(
      actionWithRightNameAction.projectProxyRoute,
    );

    const buildUrl = buildApiUrl(actionWithRightNameAction, {
      ...row,
    });
    const reqUrl =
      actionWithRightNameAction.dashboardFormActionMethodType === "Get" ||
      runWithPrams
        ? buildUrl
        : getProjectUrl +
          "/" +
          actionWithRightNameAction.routeAdderss +
          "/" +
          id;

    const result = await APIHandling(
      reqUrl,
      actionWithRightNameAction.dashboardFormActionMethodType?.split(":")[0],
      value,
    );

    if (result && result.success) {
      setLoading(false);
      return result;
    } else {
      console.log("====================================");
      console.log(result);
      console.log("====================================");
      return result;
    }
  }
};
