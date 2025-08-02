import { GetProjectUrl } from "../../../request";
export function buildApiUrl(
  apiRequest,
  baseConstants,
  getProjectUrl = GetProjectUrl()
) {
  if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
    // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
    return null; // or some default value or throw an error, depending on your use case
  }
  const constants = {
    ...baseConstants,
    languageID: window.localStorage.getItem("languageID"),
    nodeID: "2421d86a-0043-441b-988a-e7cfad6273a7",
  };
  const routeAddress = apiRequest.routeAdderss;
  const queryParam = apiRequest.dashboardFormSchemaActionQueryParams
    .filter(
      (param) =>
        param.IsRequired || constants[param.dashboardFormParameterField]
    )
    .map(
      (param) =>
        `${param.parameterName}=${constants[param.dashboardFormParameterField]}`
    )
    .join("&");

  const apiUrl = `${getProjectUrl}/${routeAddress}${
    routeAddress.includes("?") ? "&" : "?"
  }${queryParam}`;

  //const apiUrl = `${getProjectUrl}/${apiRequest.routeAdderss}?${queryParam}`;
  return apiUrl;
}
