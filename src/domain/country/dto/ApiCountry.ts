export type APIGetCountryList = APICountry[]
export interface APICountry {
  countryid: string
  countrycode: string
  countryname: string
}

export type APIGetCountryWithEvaluationInfoList = APICountryWithEvaluationInfo[]

export enum APIEvaluationType {
  CONTINUOUS = 'continous',
  DISCRETE = 'discrete',
}
export interface APICountryWithEvaluationInfo {
  countryid: string
  countrycode: string
  countryname: string
  universityid: string
  universityname: string
  evaluationsystemname: string
  validgrades: string[]
  evaluationtype: APIEvaluationType
  evaluationsystemid: string
  fixed: number
}
