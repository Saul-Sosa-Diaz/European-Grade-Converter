import { EuropeanEquivalence, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'
import { EvaluationSystemRepository } from '@/domain/evaluationSystem/evaluationSystemRepository'

export function createEvaluationSystemRepositoryFake(): EvaluationSystemRepository {
  return {
    convertGrade: async (params) => {
      const grade = Number(params.grade)
      if (grade < 5) return 'F'
      if (grade < 6) return 'E'
      if (grade < 7) return 'D'
      if (grade < 8) return 'C'
      return 'A'
    },
    getEvaluationSystemList: async () => {
      return [
        {
          evaluationType: EvaluationType.DISCRETE,
          validGrades: ['A', 'B', 'C', 'D', 'E', 'F'],
          fixed: 0,
          evaluationSystemID: '1',
          universityID: '1',
          evaluationSystemName: 'A-F',
          universityName: 'University 1',
        },
      ]
    },
    getGradeConversionListByEvaluationID: async (params) => {
      console.log('getContinuousGradeConversion', params)
      return [
        {
          gradeName: 'A',
          MinIntervalGrade: 8,
          MaxIntervalGrade: 10,
          baseEquivalentSpanishGrade: 9,
          topEquivalentSpanishGrade: 10,
          evaluationSystemID: '1',
          gradeConversionID: '1',
          europeanEquivalence: {
            equivalenceID: '1',
            equivalenceName: 'Equivalence 1',
            equivalenceDescription: 'Description 1',
            equivalenceScale: 'Scale 1',
          } as unknown as EuropeanEquivalence,
        },
      ]
    },
    updateEvaluationSystem: async (params) => {
      console.log('updateEvaluationSystem', params)
    },
    createEvaluationSystem: async (params) => {
      console.log('createEvaluationSystem', params)
    },
    deleteEvaluationSystem: async (params) => {
      console.log('deleteEvaluationSystem', params)
    },
  }
}
