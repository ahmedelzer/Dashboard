import { websoketBaseURI } from "../../../request";
export function BuildWSURL(wSRequest, mainSchemaIDValue) {
  const languageID = window.localStorage.getItem("languageID");
  //   if (!apiRequest || !apiRequest.dashboardFormSchemaActionQueryParams) {
  //     // Handle the case where apiRequest is null or does not have dashboardFormSchemaActionQueryParams
  //     return null; // or some default value or throw an error, depending on your use case
  //   }

  //   const queryParam = apiRequest.dashboardFormSchemaActionQueryParams
  //     .map(
  //       (param) =>
  //         `${param.parameterName}=${constants[param.dashboardFormParameterField]}`
  //     )
  //     .join("&");

  //   const apiUrl = `${GetProjectUrl()}/${apiRequest.routeAdderss}?${queryParam}`;
  //   console.log("apiRequest", apiRequest);
  return `${websoketBaseURI}/${wSRequest.routeAdderss}:${mainSchemaIDValue}:${languageID}`;
}
