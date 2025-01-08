export type APIGetCountries = APICountry[]

export interface APICountry {
  countryid: string
  countrycode: string
  countryname: string
  universityid: string
  universityname: string
  evaluationsystemname: string
  validgrades: string[]
}