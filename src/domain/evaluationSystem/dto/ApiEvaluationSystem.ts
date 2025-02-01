import { EuropeanEquivalence, EvaluationType } from '../evaluationSystem'

export type APIGetEvaluationSystemList = APIEvaluationSystem[]
export interface APIEvaluationSystem {
  evaluationsystemid: string
  universityid: string
  universityname: string
  evaluationtype: EvaluationType
  validgrades: string[]
  evaluationsystemname: string
  fixed: number
}

export interface APIEvaluationSystemWithGradeConversions {
  evaluationsystemid: string
  universityid: string
  universityname: string
  evaluationtype: EvaluationType
  validgrades: string[]
  evaluationsystemname: string
  fixed: number
  gradeconversions: APIGradeConversion[]
}

export type APIGradeConversion = {
  gradeconversionid: string
  evaluationsystemid: string
  europeanequivalence: EuropeanEquivalence
  minintervalgrade?: number
  maxintervalgrade?: number
  gradename?: string
  gradevalue?: string
}
