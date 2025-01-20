export enum EvaluationType {
  CONTINUOUS = 'continuous',
  DISCRETE = 'discrete',
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
