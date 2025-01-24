import { Country } from '@/domain/country/country'
import { APICountry } from '@/domain/country/dto/ApiCountry'

export const buildAPICountry = async (country: Country): Promise<APICountry> => {
  try {
    const convertedCountry: APICountry = {
      countryid: country.id,
      countrycode: country.code,
      countryname: country.name,
    }
    return convertedCountry
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
