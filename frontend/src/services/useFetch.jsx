import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = ({url, token}, callback) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        setError(err);
      });
  }, [url]);

  return { error };
};

export { useFetch };
