import { CountryRepository, DeleteCountry } from '@/domain/country/countryRepository'

export function deleteCountry(countryRepository: CountryRepository): DeleteCountry.Request {
  return async (params: DeleteCountry.Params) => {
    await countryRepository.deleteCountry(params)
  }
}
