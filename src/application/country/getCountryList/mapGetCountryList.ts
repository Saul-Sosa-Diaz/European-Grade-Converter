import { Country } from '@/domain/country/country'
import { APIGetCountryWithEvaluationInfoList } from '@/domain/country/dto/ApiCountry'

export const buildCountryListMap = async (
  dto: APIGetCountryWithEvaluationInfoList,
): Promise<Country[]> => {
  try {
    const countryList = dto.map((country) => {
      return {
        id: country.countryid,
        name: country.countryname,
        code: country.countrycode,
      }
    })

    const sortedCountries = countryList.sort((a, b) => a.name.localeCompare(b.name))
    return sortedCountries
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
