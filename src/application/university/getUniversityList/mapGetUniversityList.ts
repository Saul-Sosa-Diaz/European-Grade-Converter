import { APIUniversity } from "@/domain/university/dto/ApiUniversity"
import { University } from "@/domain/university/university"


export const buildUniversityListMap = async (
  dto: APIUniversity[],
): Promise<University[]> => {
  try {
    const universityList = dto.map((university) => {
      return {
        name: university.universityname,
        country: university.countryname,
        contryID: university.countryid,
        id: university.universityid,
      }
    })

    const sortedUniversityList = universityList.sort((a, b) => a.country.localeCompare(b.country))
    return sortedUniversityList
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
