import axios from "axios";
export const baseURL = "http://ihs.ddnsking.com:8002";
export const websoketBaseURI = "ws://ihs.ddnsking.com:8002/Chanels";
export const defaultProjectProxyRoute =
  "http://ihs.ddnsking.com:8002/Centralization/Api";

// Get projectProxyRoute
export const projectProxyRoute =
  window.sessionStorage.getItem("projectProxyRoute");

// Set projectProxyRoute
export function SetReoute(Route) {
  window.sessionStorage.setItem("projectProxyRoute", Route);
}

console.log(11111111111111111111111111, projectProxyRoute);
// Add other methods as needed

export const baseURLWithoutApi = `${baseURL}/${window.sessionStorage.getItem(
  "projectProxyRoute"
)}`;
//"proxy": "http://ihs.ddnsking.com:8000",

export function GetProjectUrl() {
  return `${baseURL}/${window.sessionStorage.getItem("projectProxyRoute")}/api`;
}
const lan = window.localStorage.getItem("language");
export const request = axios.create({
  baseURL: baseURL,
  headers: {
    // languageName: lan,
  },
});
