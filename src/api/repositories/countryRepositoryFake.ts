import { COUNTRIES } from '../../fixture/countries';

export function createProductsRepositoryFake() {
  return {
    getCountries: async () => COUNTRIES,
  };
}
