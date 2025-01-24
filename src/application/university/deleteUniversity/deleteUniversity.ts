import { DeleteUniversity, UniversityRepository } from "@/domain/university/universityRepository"


export function deleteUniversity(universityRepository: UniversityRepository): DeleteUniversity.Request {
  return async (params: DeleteUniversity.Params) => {
    await universityRepository.deleteUniversity(params)
  }
}
