import { ICountryConverter } from '@/lib/interfaces/i-grade-converter'

export enum EvaluationType {
  CONTINUOUS = 'continuous',
  DISCRETE = 'discrete',
}

export type Country = {
  label: string
  code?: string
  key: string
  selectable?: boolean
  gradeConverter?: ICountryConverter
  fixed?: number
  validGrades?: string[]
  suffix?: string
  evaluationType?: EvaluationType
  evaluationSystemID?: string
  aditionalInfo?: string
  children?: Country[]
  document_url?: string
  url?: string
}
