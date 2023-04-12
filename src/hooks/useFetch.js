import { useState, useEffect } from "react";
import { get } from "api";
import { API_BASE_URL } from "constant";

function useFetch({ url, defaultValue }) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const fetchData = (apiUrl, signal) => {
    setLoading(true);
    get(API_BASE_URL + apiUrl, {
      signal,
    })
      .then((res) => {
        setLoading(false);
        setData(res.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (url) {
      fetchData(url, abortController.signal);
    }
    return () => abortController.abort();
  }, [url]);

  return [data, loading];
}

export default useFetch;
