import { UniversityRepository, UpdateUniversity } from '@/domain/university/universityRepository'

export function updateUniversity(
  universityRepository: UniversityRepository,
): UpdateUniversity.Request {
  return async (params: UpdateUniversity.Params) => {
    await universityRepository.updateUniversity(params)
  }
}
