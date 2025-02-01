import { Pool } from 'pg'
import {
  ConverterDirection,
  convertGradeParams,
  DatabaseAdapter,
} from '../../config/databaseConfig'
import { APICountry, APICountryWithEvaluationInfo } from '@/domain/country/dto/ApiCountry'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { countryQueries } from './queries/countryQueries'
import { universityQueries } from './queries/universityQueries'
import { evaluationSystemQueries } from './queries/evaluationSystemQueries'
import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'
import {
  APIGradeConversion,
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'

export class PostgresAdapter implements DatabaseAdapter {
  private pool: Pool
  private spanishEquivalent: { base: number; top: number }[]
  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
    this.spanishEquivalent = [
      { base: 0, top: 5 },
      { base: 5, top: 6 },
      { base: 6, top: 7 },
      { base: 7, top: 8 },
      { base: 8, top: 9 },
      { base: 9, top: 10 },
    ]
  }

  async updateCountry(country): Promise<void> {
    const QUERY = countryQueries.UPDATE_COUNTRY
    const VALUES = [country.countryid, country.countrycode, country.countryname]
    await this.pool.query(QUERY, VALUES)
  }

  async createCountry(country: APICountry): Promise<void> {
    const QUERY = countryQueries.CREATE_COUNTRY
    const VALUES = [country.countrycode, country.countryname]
    await this.pool.query(QUERY, VALUES)
  }

  async deleteCountry(country: APICountry): Promise<void> {
    const QUERY = countryQueries.DELETE_COUNTRY
    const VALUES = [country.countryid]
    await this.pool.query(QUERY, VALUES)
  }

  async getCountryList(): Promise<APICountry[]> {
    const QUERY = countryQueries.GET_COUNTRY_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APICountry[])
  }

  async getCountryWithEvaluationInfoList(): Promise<APICountryWithEvaluationInfo[]> {
    const QUERY = countryQueries.GET_COUNTRY_WITH_EVALUATION_INFO_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APICountryWithEvaluationInfo[])
  }

  async getUniversityList(): Promise<APIUniversity[]> {
    const QUERY = universityQueries.GET_UNIVERSITY_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APIUniversity[])
  }

  async updateUniversity(university: APIUniversity): Promise<void> {
    const QUERY = universityQueries.UPDATE_UNIVERSITY
    const VALUES = [university.universityid, university.universityname, university.countryid]
    await this.pool.query(QUERY, VALUES)
  }

  async deleteUniversity(university: APIUniversity): Promise<void> {
    const QUERY = universityQueries.DELETE_UNIVERSITY
    const VALUES = [university.universityid]
    await this.pool.query(QUERY, VALUES)
  }

  async createUniversity(university: APIUniversity): Promise<void> {
    const QUERY = universityQueries.CREATE_UNIVERSITY
    const VALUES = [university.universityname, university.countryid]
    await this.pool.query(QUERY, VALUES)
  }

  async getEvaluationSystemList() {
    const QUERY = evaluationSystemQueries.GET_EVALUATION_SYSTEM_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APIEvaluationSystem[])
  }

  async getGradeConversionListByEvaluationID(evaluationSystemID: string) {
    const QUERY = evaluationSystemQueries.GET_CONTINUOUS_GRADE_CONVERSION_LIST_BY_EVALUATION_ID
    const VALUES = [evaluationSystemID]
    const continuousGradeConversion = this.pool
      .query(QUERY, VALUES)
      .then((result) => result.rows as APIGradeConversion[])
    const DISCRETE_QUERY =
      evaluationSystemQueries.GET_DISCRETE_GRADE_CONVERSION_LIST_BY_EVALUATION_ID
    const discreteGradeConversion = this.pool
      .query(DISCRETE_QUERY, VALUES)
      .then((result) => result.rows as APIGradeConversion[])

    return Promise.all([continuousGradeConversion, discreteGradeConversion]).then(
      ([continuous, discrete]) => [...continuous, ...discrete] as APIGradeConversion[],
    )
  }

  async updateEvaluationSystem(
    evaluationSystem: APIEvaluationSystemWithGradeConversions,
  ): Promise<void> {
    const QUERY = evaluationSystemQueries.UPDATE_EVALUATION_SYSTEM
    const VALUES = [
      evaluationSystem.evaluationsystemname,
      evaluationSystem.universityid,
      evaluationSystem.validgrades,
      evaluationSystem.evaluationtype,
      evaluationSystem.fixed,
      evaluationSystem.evaluationsystemid,
    ]

    // Update evaluation system table
    await this.pool.query(QUERY, VALUES)
    // Update associated grade conversions
    await Promise.all(
      evaluationSystem.gradeconversions.map((gradeConversion, index) => {
        const GRADE_CONVERSION_VALUES = [
          gradeConversion.minintervalgrade,
          gradeConversion.maxintervalgrade,
          gradeConversion.gradename,
          this.spanishEquivalent[index].base,
          this.spanishEquivalent[index].top,
          gradeConversion.gradeconversionid,
        ]

        return this.pool.query(
          evaluationSystemQueries.UPDATE_CONTINUOUS_GRADE_CONVERSION,
          GRADE_CONVERSION_VALUES,
        )
      }),
    )
  }

  async createEvaluationSystem(
    evaluationSystem: APIEvaluationSystemWithGradeConversions,
  ): Promise<void> {
    const QUERY = evaluationSystemQueries.CREATE_EVALUATION_SYSTEM
    console.log('evaluationSystem', evaluationSystem)
    const VALUES = [
      evaluationSystem.evaluationsystemname,
      evaluationSystem.universityid,
      evaluationSystem.validgrades,
      evaluationSystem.evaluationtype,
      evaluationSystem.fixed,
    ]
    // Create evaluation system
    const newEvaluationSystemId = (await this.pool.query(QUERY, VALUES)).rows[0].evaluationsystemid
    // Create associated grade conversions
    await Promise.all(
      evaluationSystem.gradeconversions.map((gradeConversion, index) => {
        const GRADE_CONVERSION_VALUES = [
          newEvaluationSystemId,
          gradeConversion.minintervalgrade,
          gradeConversion.maxintervalgrade,
          gradeConversion.gradename,
          this.spanishEquivalent[index].base,
          this.spanishEquivalent[index].top,
        ]

        return this.pool.query(
          evaluationSystemQueries.CREATE_CONTINUOUS_GRADE_CONVERSION,
          GRADE_CONVERSION_VALUES,
        )
      }),
    )
  }

  async deleteEvaluationSystem(evaluationSystem: APIEvaluationSystem): Promise<void> {
    const QUERY = evaluationSystemQueries.DELETE_EVALUATION_SYSTEM
    const VALUES = [evaluationSystem.evaluationsystemid]
    await this.pool.query(QUERY, VALUES)
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
        ? evaluationSystemQueries.COUNTINUOUS_TO_SPAIN
        : evaluationSystemQueries.COUNTINUOUS_FROM_SPAIN

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
        ? evaluationSystemQueries.DISCRETE_TO_SPAIN
        : evaluationSystemQueries.DISCRETE_FROM_SPAIN
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
