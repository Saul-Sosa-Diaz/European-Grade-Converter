import { CreateUniversity, UniversityRepository } from '@/domain/university/universityRepository'

export function createUniversity(
  universityRepository: UniversityRepository,
): CreateUniversity.Request {
  return async (params: CreateUniversity.Params) => {
    await universityRepository.createUniversity(params)
  }
}
