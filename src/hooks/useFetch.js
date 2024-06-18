/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
      }
      const result = await res.json();
      setData(result.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data };
};

export default useFetch;
