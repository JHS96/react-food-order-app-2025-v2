import { useState, useEffect, useCallback } from 'react';

async function sendHttpRquest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || 'Someting went wrong, failed to send request.'
    );
  }

  return responseData;
}

export function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRquest(url, { ...config, body: data });
        setData(resData);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
