
import { createApiFake } from "./createApiFake";
import { createCountryRepository } from "./repositories/countryRepository";

export function createApi() {
  if (process.env.DEBUG) return createApiFake();

  const COUNTRIES_REPOSITORY = createCountryRepository();

  return {
    getCountries: COUNTRIES_REPOSITORY.getCountries,
  };
}
