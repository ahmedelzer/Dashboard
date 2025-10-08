import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProjectUrl, request, SetHeaders } from "../../../request";
import RedirectToLogin from "./RedirectToLogin";
import { LanguageContext } from "../../../contexts/Language";

const UseFetchWithoutBaseUrl = (realurl) => {
  const { Lan } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchedRef = useRef(false); // ✅ Prevents double-fetch in StrictMode
  const lastUrlRef = useRef(null); // ✅ Prevents same-URL re-fetch

  useEffect(() => {
    if (!realurl) return;

    // Avoid re-fetching the same URL or refetch due to StrictMode
    if (fetchedRef.current && lastUrlRef.current === `${realurl}-${Lan}`)
      return;

    fetchedRef.current = true;
    lastUrlRef.current = `${realurl}-${Lan}`;

    const controller = new AbortController(); // ✅ Abort on unmount

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // ✅ Add interceptor only once globally
        if (!request.interceptors.request.handlers.length) {
          request.interceptors.request.use(
            (config) => {
              config.headers = {
                ...config.headers,
                ...SetHeaders(),
              };
              return config;
            },
            (error) => Promise.reject(error)
          );
        }

        const res = await request.get(realurl, {
          signal: controller.signal,
        });
        setData(res.data);
      } catch (err) {
        if (err.name === "AbortError") return; // cancelled
        setError(err);
        if (err.code === 401) RedirectToLogin(navigate, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // cleanup
  }, [realurl, Lan, navigate]);

  return { data, isLoading, error };
};

export default UseFetchWithoutBaseUrl;
