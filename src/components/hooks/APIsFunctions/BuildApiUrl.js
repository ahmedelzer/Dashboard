import { GetProjectUrl } from "../../../request";
import { projectProxyRoute } from "../../../request";
import { baseURL } from "../../../request";
export function buildApiUrl(apiRequest, constants) {
  console.log("====================================usus");
  console.log(constants);
  console.log("====================================");
  if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
    // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
    return null; // or some default value or throw an error, depending on your use case
  }

  const queryParam = apiRequest.dashboardFormSchemaActionQueryParams
    .map(
      (param) =>
        `${param.parameterName}=${constants[param.dashboardFormParameterField]}`
    )
    .join("&");

  const apiUrl = `${GetProjectUrl()}/${apiRequest.routeAdderss}?${queryParam}`;
  return apiUrl;
}
