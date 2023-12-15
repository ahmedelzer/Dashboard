// export default async function APIHandling(url, methodType, sendBody) {
//   var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// var raw = JSON.stringify({
//   sendBody
// });

// var requestOptions = {
//   method: methodType,
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://ihs.ddnsking.com/api/"+url, requestOptions)
// .then(response => response.text())
// .then(result =>  result)
// .catch(error =>  error);
// }


import { useState, useEffect } from 'react';
import axios from 'axios';

const APIHandling = (url) => {
  let realurl=`http://ihs.ddnsking.com/api/${url}`
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(realurl);
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

export default APIHandling;
