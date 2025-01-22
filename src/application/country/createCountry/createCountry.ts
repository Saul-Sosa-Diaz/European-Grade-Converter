import { CountryRepository, CreateCountry } from '@/domain/country/countryRepository'

export function createCountry(countryRepository: CountryRepository): CreateCountry.Request {
  return async (params: CreateCountry.Params) => {
    await countryRepository.createCountry(params)
  }
}
