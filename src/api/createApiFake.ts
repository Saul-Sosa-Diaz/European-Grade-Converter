import { createProductsRepositoryFake } from "./repositories/countryRepositoryFake";

export function createApiFake() {
const COUNTRIES_REPOSITORY = createProductsRepositoryFake();
  return {
    getCountries: COUNTRIES_REPOSITORY.getCountries,
  };
}
