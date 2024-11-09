
import { createApiFake } from "./createApiFake";
import { createCountryRepository } from "../infrastructure/repositories/countryRepository";
import { getCountries } from "../application/getCountries";

export function createApi() {
  if (process.env.DEBUG) return createApiFake();

  const countriesRepository = createCountryRepository();

  return {
    getCountries: getCountries(countriesRepository),
  };
}
