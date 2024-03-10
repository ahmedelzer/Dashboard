import axios from "axios";
export const baseURL = "http://ihs.ddnsking.com:8000";
export const baseURLWithoutApi = `${baseURL}/Centralization`;
//"proxy": "http://ihs.ddnsking.com:8000",
export const centralizationURL = `${baseURL}/Centralization/api`;

const lan = window.localStorage.getItem("language");
export const request = axios.create({
  baseURL: baseURL,
  headers: {
    // languageName: lan,
  },
});
