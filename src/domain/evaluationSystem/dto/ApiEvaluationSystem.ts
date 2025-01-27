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
