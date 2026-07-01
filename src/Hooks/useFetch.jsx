import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json().catch(() => null);

      if (response.status === 429) {
        throw new Error('Muitas tentativas na API. Aguarde um pouco e tente novamente.');
      }

      if (!response.ok) {
        throw new Error(json?.message || 'Nao foi possivel completar a requisicao.');
      }
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Nao foi possivel conectar com a API agora. Tente novamente em alguns minutos.');
      } else {
        setError(err.message);
      }
      json = null;
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
