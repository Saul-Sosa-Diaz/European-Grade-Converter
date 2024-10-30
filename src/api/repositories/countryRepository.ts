export function createCountryRepository() {
  return {
    getCountries: async (params) => {
      const { countries } = await fetch("/api/countries", {
        method: "get",
        body: JSON.stringify(params),
      }).then((response) => {
        return response.json();
      });

      return countries;
    },
  };
}
