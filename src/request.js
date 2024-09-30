import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = "http://maingatewayapi.ihs-solutions.com:8000";
export const languageName = window.localStorage.getItem("language");
export const languageID = window.localStorage.getItem("languageID");
export const token = Cookies.get("user");
export const websoketBaseURI = "ws://ihs.ddnsking.com:8002/Chanels";
export const defaultProjectProxyRoute =
  "http://maingatewayapi.ihs-solutions.com:8000/Centralization/api";

// Get projectProxyRoute
export const projectProxyRoute =
  window.sessionStorage.getItem("projectProxyRoute");

// Set projectProxyRoute
export function SetReoute(Route) {
  window.sessionStorage.setItem("projectProxyRoute", Route);
}

// Add other methods as needed

export const baseURLWithoutApi = `${baseURL}/${window.sessionStorage.getItem(
  "projectProxyRoute"
)}`;
//"proxy": "http://ihs.ddnsking.com:8000",

export function GetProjectUrl() {
  return `${baseURL}/${window.sessionStorage.getItem("projectProxyRoute")}/api`;
}
export function SetHeaders() {
  const headers = {
    languageName: encodeURIComponent(window.localStorage.getItem("language")),
    "Content-Type": "application/json",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Origin": "*",
    languageID: window.localStorage.getItem("languageID"),
  };

  // Remove any undefined or null properties
  Object.keys(headers).forEach(
    (key) =>
      (headers[key] === undefined || headers[key] === null) &&
      delete headers[key]
  );

  return headers;
}

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    ...SetHeaders(),
  },

  // withCredentials: true,
});
