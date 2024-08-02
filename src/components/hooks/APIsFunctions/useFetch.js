import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../request";
import { GetProjectUrl } from "../../../request";
import { request, defaultProjectProxyRoute } from "../../../request";

const useFetch = (url, base_URL) => {
  const realurl = `${
    base_URL !== GetProjectUrl() ? defaultProjectProxyRoute : base_URL
  }${url}`;
  //base_URL = "";
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await request.get(realurl);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [realurl]);

  return { data, isLoading, error };
};
export const fetchData = async (url, base_URL, options = {}) => {
  options = {
    method: "GET", // or 'POST', 'PUT', etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer your-token", // Add any other headers you need
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
