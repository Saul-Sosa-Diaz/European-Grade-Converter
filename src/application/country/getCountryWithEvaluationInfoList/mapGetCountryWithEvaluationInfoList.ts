import { CountryWithEvaluationInfo } from '@/domain/country/country'
import {
  APICountryWithEvaluationInfo,
  APIGetCountryWithEvaluationInfoList,
} from '@/domain/country/dto/ApiCountry'
import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'

export const buildCountryEvaluationMap = async (
  dto: APIGetCountryWithEvaluationInfoList,
): Promise<CountryWithEvaluationInfo[]> => {
  try {
    const CountryIdOccurrences: Record<number, number> = {}
    const UniversityIdOccurrences: Record<number, number> = {}

    dto.forEach((country: APICountryWithEvaluationInfo) => {
      if (CountryIdOccurrences[country.countryid]) {
        CountryIdOccurrences[country.countryid]++
      } else {
        CountryIdOccurrences[country.countryid] = 1
      }
      if (UniversityIdOccurrences[country.universityid]) {
        UniversityIdOccurrences[country.universityid]++
      } else {
        UniversityIdOccurrences[country.universityid] = 1
      }
    })

    const mappedCountries: CountryWithEvaluationInfo[] = []

    Object.keys(CountryIdOccurrences).forEach((countryId) => {
      // Find the current country
      const country = dto.find((country) => parseInt(country.countryid) === parseInt(countryId))
      if (CountryIdOccurrences[countryId] === 1) {
        // If there is only one entry for this country
        mappedCountries.push({
          label: country.countryname,
          code: country.countrycode,
          key: String(country.countryid),
          evaluationType: country.evaluationtype as unknown as EvaluationType,
          fixed: country.fixed,
          validGrades: country.validgrades,
          evaluationSystemID: country.evaluationsystemid,
        })
        return
      }

      let children: CountryWithEvaluationInfo[] = []
      if (CountryIdOccurrences[countryId] > 1) {
        // Management of single universities per country
        children = dto
          .filter((country) => parseInt(country.countryid) === parseInt(countryId))
          .reduce((uniqueUniversities, country) => {
            // Filter unique universities based on `universityid`.
            if (
              !uniqueUniversities.some(
                (university) =>
                  parseInt(university.universityid) === parseInt(country.universityid),
              )
            ) {
              uniqueUniversities.push(country)
            }
            return uniqueUniversities
          }, [])
          .map((country) => {
            if (UniversityIdOccurrences[country.universityid] > 1) {
              // Management of unique evaluation systems per university
              const deepestChildren: CountryWithEvaluationInfo[] = dto
                .filter(
                  (dtoItem) => parseInt(dtoItem.universityid) === parseInt(country.universityid),
                )
                .reduce((uniqueSystems, dtoItem) => {
                  const key = `${dtoItem.countrycode}-${dtoItem.universityid}-${dtoItem.evaluationsystemname}`
                  if (!uniqueSystems.some((system) => system.key === key)) {
                    uniqueSystems.push({
                      label: dtoItem.evaluationsystemname,
                      code: dtoItem.countrycode,
                      fixed: dtoItem.fixed,
                      key,
                      evaluationType: country.evaluationtype as unknown as EvaluationType,
                      evaluationSystemID: dtoItem.evaluationsystemid,
                      validGrades: dtoItem.validgrades,
                    })
                  }
                  return uniqueSystems
                }, [])

              return {
                label: country.universityname,
                selectable: false,
                code: country.countrycode,
                key: `${country.countrycode}-${country.universityid}`,
                children: deepestChildren,
              }
            }

            return {
              label: country.universityname,
              code: country.countrycode,
              evaluationType: country.evaluationtype as unknown as EvaluationType,
              key: `${country.countrycode}-${country.universityid}`,
              fixed: country.fixed,
              evaluationSystemID: country.evaluationsystemid,
              validGrades: country.validgrades,
            }
          })
      } else {
        children = dto
          .filter((country) => parseInt(country.countryid) === parseInt(countryId))
          .map((country) => {
            return {
              label: country.universityname,
              code: country.countrycode,
              evaluationType: country.evaluationtype as unknown as EvaluationType,
              key: `${country.countrycode}-${country.universityid}`,
              fixed: country.fixed,
              evaluationSystemID: country.evaluationsystemid,
              validGrades: country.validgrades,
            }
          })
      }

      // add country with the childrens
      mappedCountries.push({
        label: country.countryname,
        code: country.countrycode,
        selectable: false,
        key: String(country.countryid),
        children: children,
      })
    })
    const sortedCountries = mappedCountries.sort((a, b) => a.label.localeCompare(b.label))
    return sortedCountries
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
