import { EvaluationType } from "../evaluationSystem/evaluationSystem"

export type Country = {
  name: string
  code: string
  id: string
}

export type CountryWithEvaluationInfo = {
  label: string
  code?: string
  key: string
  selectable?: boolean
  fixed?: number
  validGrades?: string[]
  suffix?: string
  evaluationType?: EvaluationType
  evaluationSystemID?: string
  aditionalInfo?: string
  children?: CountryWithEvaluationInfo[]
  document_url?: string
  url?: string
}
