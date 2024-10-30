
import { createApiFake } from "./createApiFake";
import { createCountryRepository } from "./repositories/countryRepository";

type CreateApiProps = {
  offline?: boolean;
};

export function createApi({ offline = false }: CreateApiProps) {
  if (offline) return createApiFake();

  const COUNTRIES_REPOSITORY = createCountryRepository();

  return {
    getCountries: COUNTRIES_REPOSITORY.getCountries,
  };
}
