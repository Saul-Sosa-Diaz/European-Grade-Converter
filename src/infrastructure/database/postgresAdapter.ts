import { Pool } from 'pg'
import { QUERIES } from './queries'
import { ConverterDirection, convertGradeParams, DatabaseAdapter } from '../config/databaseConfig'
import { APICountry, APICountryWithEvaluationInfo } from '@/domain/country/dto/ApiCountry'
import { EvaluationType } from '@/domain/country/country'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'

export class PostgresAdapter implements DatabaseAdapter {
  private pool: Pool
  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
  }

  async updateCountry(country): Promise<void> {
    const QUERY = QUERIES.UPDATE_COUNTRY
    const VALUES = [country.countryid, country.countrycode, country.countryname]
    await this.pool.query(QUERY, VALUES)
  }

  async createCountry(country: APICountry): Promise<void> {
    const QUERY = QUERIES.CREATE_COUNTRY
    const VALUES = [country.countrycode, country.countryname]
    await this.pool.query(QUERY, VALUES)
  }

  async deleteCountry(country: APICountry): Promise<void> {
    const QUERY = QUERIES.DELETE_COUNTRY
    const VALUES = [country.countryid]
    await this.pool.query(QUERY, VALUES)
  }

  async getCountryList(): Promise<APICountry[]> {
    const QUERY = QUERIES.GET_COUNTRY_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APICountry[])
  }

  async getCountryWithEvaluationInfoList(): Promise<APICountryWithEvaluationInfo[]> {
    const QUERY = QUERIES.GET_COUNTRY_WITH_EVALUATION_INFO_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APICountryWithEvaluationInfo[])
  }

  async getUniversityList(): Promise<APIUniversity[]> {
    const QUERY = QUERIES.GET_UNIVERSITY_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APIUniversity[])
  }

  async convertGrade({
    evaluationSystemID,
    evaluationType,
    grade,
    direction,
  }: convertGradeParams): Promise<number> {
    if (evaluationType === EvaluationType.CONTINUOUS) {
      return this.continuousGradeConvert({ evaluationSystemID, grade, direction })
    } else {
      return this.discteteGradeConvert({ evaluationSystemID, grade, direction })
    }
  }

  private async continuousGradeConvert({ evaluationSystemID, grade, direction }) {
    const gradeNumber = Number(grade)

    if (isNaN(gradeNumber)) {
      // if the grade is not a number, it means that is a special grade like 30L in Italy or Matricula de Honor in Spain
      return this.discteteGradeConvert({ evaluationSystemID, grade, direction, specialGrade: true })
    }

    const QUERY =
      direction === ConverterDirection.toSpain
        ? QUERIES.COUNTINUOUS_TO_SPAIN
        : QUERIES.COUNTINUOUS_FROM_SPAIN

    const VALUES = [evaluationSystemID, grade]
    const { rows } = await this.pool.query(QUERY, VALUES)

    if (rows.length === 0) {
      // It could be a special grade that has another conversion
      console.log('No conversion found', evaluationSystemID, grade, direction)
      return this.discteteGradeConvert({ evaluationSystemID, grade, direction, specialGrade: true })
    }
    const conversion = rows[0]

    const minIntervalGrade = Number(conversion.minintervalgrade)
    const baseEquivalentSpanishGrade = Number(conversion.baseequivalentspanishgrade)
    const topEquivalentSpanishGrade = Number(conversion.topequivalentspanishgrade)
    const maxIntervalGrade = Number(conversion.maxintervalgrade)

    const convertedGrade =
      direction === ConverterDirection.toSpain
        ? ((gradeNumber - minIntervalGrade) / (maxIntervalGrade - minIntervalGrade)) *
            (topEquivalentSpanishGrade - baseEquivalentSpanishGrade) +
          baseEquivalentSpanishGrade
        : ((gradeNumber - baseEquivalentSpanishGrade) /
            (topEquivalentSpanishGrade - baseEquivalentSpanishGrade)) *
            (maxIntervalGrade - minIntervalGrade) +
          minIntervalGrade

    return convertedGrade
  }

  private async discteteGradeConvert({
    evaluationSystemID,
    grade,
    direction,
    specialGrade = false,
  }) {
    console.log('Discrete grade convert', evaluationSystemID, grade, direction)
    const QUERY =
      direction === ConverterDirection.toSpain
        ? QUERIES.DISCRETE_TO_SPAIN
        : QUERIES.DISCRETE_FROM_SPAIN
    const VALUES = [evaluationSystemID, grade]
    const { rows } = await this.pool.query(QUERY, VALUES)
    if (rows.length === 0) {
      throw new Error('No conversion found')
    }
    const conversion = rows[0]

    const baseEquivalentSpanishGrade = Number(conversion.baseequivalentspanishgrade)
    const topEquivalentSpanishGrade = Number(conversion.topequivalentspanishgrade)
    const gradeValue = conversion.gradevalue
    console.log('Discrete grade convert', evaluationSystemID, grade, direction, conversion)
    if (specialGrade) {
      // special grade is a boolean that indicates if the grade is special and comes from the contiuous conversion. like in Italy with the 30L, or in Spain Matricula de Honor
      return direction === ConverterDirection.toSpain ? topEquivalentSpanishGrade : gradeValue
    }

    const convertedGrade =
      direction === ConverterDirection.toSpain
        ? (baseEquivalentSpanishGrade + topEquivalentSpanishGrade) / 2
        : gradeValue

    return convertedGrade
  }
}
