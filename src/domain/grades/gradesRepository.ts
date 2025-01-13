export namespace ConvertGrade {
  export type Params = {
    fromEvaluationSystemID: string
    toEvaluationSystemID: string
    grade: string
    fixed: string
  }
  export type Response = string
  export type Request = (params: ConvertGrade.Params) => Promise<ConvertGrade.Response>
}

export interface GradesRepository {
  convertGrade: ConvertGrade.Request
}
