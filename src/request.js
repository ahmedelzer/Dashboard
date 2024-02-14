import axios from "axios";
export const baseURL = "http://ihs.ddnsking.com/api";

const lan = window.localStorage.getItem("language");
export const request = axios.create({
  baseURL: baseURL,
  headers: {
    // languageName: lan,
  },
});
