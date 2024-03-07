import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../request";
import { request } from "../../../request";

const useFetch = (url, base_URL) => {
  const realurl = `${base_URL ?? baseURL}${url}`;
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

export default useFetch;
