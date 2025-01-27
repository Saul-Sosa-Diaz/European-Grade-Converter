import { EvaluationType } from '../country/country'

export namespace ConvertGrade {
  export type Params = {
    fromEvaluationSystemID: string
    toEvaluationSystemID: string
    fromEvaluationType: EvaluationType
    toEvaluationType: EvaluationType
    grade: string
    fixed: string
  }
  export type Response = string
  export type Request = (params: ConvertGrade.Params) => Promise<ConvertGrade.Response>
}

export interface EvalutationSystemRepository {
  convertGrade: ConvertGrade.Request
}
