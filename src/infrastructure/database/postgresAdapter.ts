import { Pool } from 'pg'
import { QUERIES } from './queries'
import { ConverterDirection, convertGradeParams, DatabaseAdapter } from '../config/databaseConfig'
import { APICountry } from '@/domain/country/dto/ApiGetCountries'
import { EvaluationType } from '@/domain/country/country'

export class PostgresAdapter implements DatabaseAdapter {
  private pool: Pool
  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
  }

  getCountries(): Promise<APICountry[]> {
    const QUERY = QUERIES.GET_COUNTRIES
    return this.pool.query(QUERY).then((result) => result.rows as APICountry[])
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
    const QUERY =
      direction === ConverterDirection.toSpain
        ? QUERIES.COUNTINUOUS_TO_SPAIN
        : QUERIES.COUNTINUOUS_FROM_SPAIN

    const VALUES = [evaluationSystemID, grade]
    const { rows } = await this.pool.query(QUERY, VALUES)

    if (rows.length === 0) {
      throw new Error('No conversion found')
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

  private async discteteGradeConvert({ evaluationSystemID, grade, direction }) {
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

    const convertedGrade =
      direction === ConverterDirection.toSpain
        ? (baseEquivalentSpanishGrade + topEquivalentSpanishGrade) / 2
        : gradeValue

    return convertedGrade
  }
}
