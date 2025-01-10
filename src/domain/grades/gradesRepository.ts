export namespace ConvertGrade {
  export type Params = {
    FromEvaluationSystemID: string
    ToEvaluationSystemID: string
    grade: number
  }
  export type Response = string
  export type Request = (params: ConvertGrade.Params) => Promise<ConvertGrade.Response>
}

export interface GradesRepository {
  convertGrade: ConvertGrade.Request
}
