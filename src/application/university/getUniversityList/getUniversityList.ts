import { GetUniversityList, UniversityRepository } from '@/domain/university/universityRepository'

export function getUniversityList(
  universityRepository: UniversityRepository,
): GetUniversityList.Request {
  return async () => await universityRepository.getUniversityList()
}
