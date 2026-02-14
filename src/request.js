import axios from "axios";
import LZString from "lz-string";

import Cookies from "js-cookie";
export function GetToken() {
  const compressed = Cookies.get("user");

  return compressed
    ? LZString.decompressFromEncodedURIComponent(compressed)
    : null;
}
// export const baseURL = "https://maingatewayapi.ihs-solutions.com:8000";
export const domainURL = "ihs-solutions.com";
export const baseURL = "https://" + domainURL;

export const languageName = window.localStorage.getItem("language");
export const languageID = window.localStorage.getItem("languageID");
export const token = GetToken();
// export const publicImageURL = "http://41.196.0.25:5004/";
// export const websocketBaseURI =
//   "wss://maingatewayapi.ihs-solutions.com:8000/Chanels";
// export const defaultProjectProxyRoute =
//   "https://maingatewayapi.ihs-solutions.com:8000/Centralization/api";
export const defaultProjectProxyRoute = `${baseURL}/Centralization/api`;
export const defaultProjectProxyRouteWithoutBaseURL = `Centralization`;
export const defaultProjectProxyRouteWithoutAPI = `${baseURL}/Centralization/`;
export const publicImageURL = "https://" + domainURL + ":5055/";
export const websocketBaseURI = "wss://" + domainURL + ":9001";
// export const baseURLWithoutApi = `${baseURL}/${projectProxyRoute}`;
export let isOnline = true;

// Add other methods as needed
export function SetIsOnline(state) {
  isOnline = state;
}
export var baseURLWithoutApi = `${baseURL}`;

//"proxy": "http://ihs.ddnsking.com:8000",

export function GetProjectUrl(projectProxyRoute) {
  baseURLWithoutApi = `${baseURL}/${projectProxyRoute}`;
  return `${baseURL}/${projectProxyRoute}/api`;
}
export function SetHeaders() {
  const token = GetToken();
  const headers = {
    languageName: encodeURIComponent(window.localStorage.getItem("language")),
    "Content-Type": "application/json",
    clientID: "facebookClient",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Origin": "*",
    token: token,

    languageID: window.localStorage.getItem("languageID"),
  };

  // Remove any undefined or null properties
  Object.keys(headers).forEach(
    (key) =>
      (headers[key] === undefined || headers[key] === null) &&
      delete headers[key],
  );

  return headers;
}

export const request = axios.create({
  // baseURL: baseURL,
  // headers: {
  //   ...SetHeaders(),
  // },
  // withCredentials: true,
});
