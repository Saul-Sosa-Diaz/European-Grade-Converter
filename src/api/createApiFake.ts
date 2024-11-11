
import { createProductsRepositoryFake } from "../infrastructure/repositories/countryRepositoryFake";
import { Api } from "./domain/Api";
import { getCountries } from "../application/getCountries";

export function createApiFake(): Api {
const COUNTRIES_REPOSITORY = createProductsRepositoryFake();
  return {
    Countries: {
      getCountries: getCountries(COUNTRIES_REPOSITORY),
    },
  };
}
