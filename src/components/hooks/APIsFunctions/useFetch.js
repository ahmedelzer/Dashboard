import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  defaultProjectProxyRoute,
  GetProjectUrl,
  request,
  SetHeaders,
} from "../../../request";
import RedirectToLogin from "./RedirectToLogin";
import UseFetchWithoutBaseUrl from "./UseFetchWithoutBaseUrl";

const useFetch = (url, base_URL) => {
  const realurl = `${
    base_URL !== GetProjectUrl() ? defaultProjectProxyRoute : base_URL
  }${url}`;
  // console.log(base_URL, GetProjectUrl());
  return UseFetchWithoutBaseUrl(realurl);
};
export const fetchData = async (url, base_URL, options = {}) => {
  options = {
    method: "GET", // or 'POST', 'PUT', etc.
    headers: {
      "Content-Type": "application/json",
      ...SetHeaders(),
    },
  };

  const realurl = `${
    base_URL !== GetProjectUrl() ? defaultProjectProxyRoute : base_URL
  }${url}`;
  try {
    const response = await fetch(realurl, options);
    const result = await response.json();
    return { data: result, error: null, isLoading: false };
  } catch (error) {
    return { data: null, error: error, isLoading: false };
  }
};

export default useFetch;
