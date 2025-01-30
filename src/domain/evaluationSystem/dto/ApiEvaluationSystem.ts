import { EvaluationType } from '../evaluationSystem'

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
  gradeconversions: APIContinuousGradeConversion[]
}

export type APIContinuousGradeConversion = {
  gradeconversionid: string
  evaluationsystemid: string
  minintervalgrade: number
  maxintervalgrade: number
  gradename: string
}
