import { CountryRepository, UpdateCountry } from "@/domain/country/countryRepository";


export function updateCountry(countryRepository: CountryRepository): UpdateCountry.Request {
  return async (params: UpdateCountry.Params) =>{ await countryRepository.updateCountry(params)}
}
