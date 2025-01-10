import { GradesRepository } from '@/domain/grades/gradesRepository'



export function createGradeRepositoryFake(): GradesRepository {
  return {
    convertGrade: async (params) => {
      if (params.grade < 5) return 'F'
      if (params.grade < 6) return 'E'
      if (params.grade < 7) return 'D'
      if (params.grade < 8) return 'C'
      return 'A'
    }
  }
}
