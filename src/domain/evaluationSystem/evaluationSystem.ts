export enum EvaluationType {
  CONTINUOUS = 'continuous',
  DISCRETE = 'discrete',
}

export type EvaluationSystem = {
  evaluationSystemID: string
  evaluationSystemName: string
  evaluationType: EvaluationType
  validGrades: string[]
  fixed: number
  universityID: string
  universityName: string
}

export type GradeConversion = {
  gradeConversionID: string
  evaluationSystemID: string
  MinIntervalGrade?: number
  MaxIntervalGrade?: number
  gradeName?: string
  gradeValue?: string
}

export type EvaluationSystemWithGradeConversions = {
  evaluationSystemID: string
  evaluationSystemName: string
  evaluationType: EvaluationType
  validGrades: string[]
  fixed: number
  universityID: string
  universityName: string
  gradeConversions: GradeConversion[]
}
