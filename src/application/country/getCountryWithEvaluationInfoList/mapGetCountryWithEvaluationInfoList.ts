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
    // Group records by countryid
    const countriesById: Record<string, APICountryWithEvaluationInfo[]> = {}
    dto.forEach((item) => {
      if (!countriesById[item.countryid]) {
        countriesById[item.countryid] = []
      }
      countriesById[item.countryid].push(item)
    })

    // Auxiliary function to group by university and, in case of having more than one evaluation system, to group them together.
    const buildUniversityNodes = (
      items: APICountryWithEvaluationInfo[],
    ): CountryWithEvaluationInfo[] => {
      // We group by universityid
      const universitiesById: Record<string, APICountryWithEvaluationInfo[]> = {}
      items.forEach((item) => {
        if (!universitiesById[item.universityid]) {
          universitiesById[item.universityid] = []
        }
        universitiesById[item.universityid].push(item)
      })

      return Object.values(universitiesById).map((uniGroup) => {
        // If a university has more than one evaluation system, we create an intermediate node.
        if (uniGroup.length > 1) {
          // Grouping of evaluation systems (unique in combination)
          const systems = uniGroup.reduce((acc, cur) => {
            const key = `${cur.countrycode}-${cur.universityid}-${cur.evaluationsystemname}`
            if (!acc.some((s) => s.key === key)) {
              acc.push({
                label: cur.evaluationsystemname,
                code: cur.countrycode,
                fixed: cur.fixed,
                key,
                evaluationType: cur.evaluationtype as unknown as EvaluationType,
                evaluationSystemID: cur.evaluationsystemid,
                validGrades: cur.validgrades,
              })
            }
            return acc
          }, [] as CountryWithEvaluationInfo[])

          return {
            label: uniGroup[0].universityname,
            selectable: false,
            code: uniGroup[0].countrycode,
            key: `${uniGroup[0].countrycode}-${uniGroup[0].universityid}`,
            children: systems,
          }
        }

        // If there is only one record for the university, it is returned as a sheet.
        const item = uniGroup[0]
        return {
          label: item.universityname,
          code: item.countrycode,
          evaluationType: item.evaluationtype as unknown as EvaluationType,
          key: `${item.countrycode}-${item.universityid}`,
          fixed: item.fixed,
          evaluationSystemID: item.evaluationsystemid,
          validGrades: item.validgrades,
        }
      })
    }

    // Build the structure by country
    const mappedCountries: CountryWithEvaluationInfo[] = Object.keys(countriesById).map(
      (countryId) => {
        const items = countriesById[countryId]
        // A representative record is taken for general country information.
        const countryInfo = items[0]

        // If the country has only one record, it is returned as a leaf node (no children or subdivision of evaluationtype).
        if (items.length === 1) {
          return {
            label: countryInfo.countryname,
            code: countryInfo.countrycode,
            key: String(countryInfo.countryid),
            evaluationType: countryInfo.evaluationtype as unknown as EvaluationType,
            fixed: countryInfo.fixed,
            evaluationSystemID: countryInfo.evaluationsystemid,
            validGrades: countryInfo.validgrades,
          }
        }

        // If the country has more than one registry, universities are grouped together.
        const children = buildUniversityNodes(items)
        return {
          label: countryInfo.countryname,
          code: countryInfo.countrycode,
          key: String(countryInfo.countryid),
          selectable: false,
          children,
        }
      },
    )

    const sortedCountries = mappedCountries.sort((a, b) => a.label.localeCompare(b.label))
    return sortedCountries
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}
