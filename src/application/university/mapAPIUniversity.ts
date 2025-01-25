import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { University } from '@/domain/university/university'

export const buildAPIUniversity = async (university: University): Promise<APIUniversity> => {
  try {
    const convertedUniversity: APIUniversity = {
      universityname: university.name,
      countryname: university.country,
      countryid: university.countryID,
      universityid: university.id,
    }
    return convertedUniversity
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
