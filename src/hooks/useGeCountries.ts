
import { useApi } from "@/src/context/ApiContext";

import { useEffect, useState } from "react";

export const useGetCountries = () => {
  const [countries, setCountries] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const api = useApi();

  useEffect(() => {
    api
      .getCountries()
      .then((countries) => {
        setIsLoading(false);
        setCountries(countries);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { countries, isLoading };
};