import { createProductsRepositoryFake } from "../infrastructure/repositories/countryRepositoryFake";

export function createApiFake() {
const COUNTRIES_REPOSITORY = createProductsRepositoryFake();
  return {
    getCountries: COUNTRIES_REPOSITORY.getCountries,
  };
}
