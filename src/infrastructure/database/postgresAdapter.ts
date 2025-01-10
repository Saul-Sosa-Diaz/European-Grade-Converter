import { Pool } from 'pg'
import { QUERIES } from './queries'
import { convertGradeParams, DatabaseAdapter } from '../config/databaseConfig'
import { APICountry } from '@/domain/country/dto/ApiGetCountries'

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
    grade,
    direction,
  }: convertGradeParams): Promise<string> {
    const QUERY = QUERIES.CALCULATE_GRADE
    const VALUES = [evaluationSystemID, grade]
    const { rows } = await this.pool.query(QUERY, VALUES)

    if (rows.length === 0) {
      throw new Error('No conversion found')
    }
    const conversion = rows[0]
    const convertedGrade =
      direction === 'toSpanish'
        ? ((grade - conversion.MinIntervalGrade) /
            (conversion.MaxIntervalGrade - conversion.MinIntervalGrade)) *
            (conversion.topEquivalentSpanishGrade - conversion.baseEquivalentSpanishGrade) +
          conversion.baseEquivalentSpanishGrade
        : ((grade - conversion.baseEquivalentSpanishGrade) /
            (conversion.topEquivalentSpanishGrade - conversion.baseEquivalentSpanishGrade)) *
            (conversion.MaxIntervalGrade - conversion.MinIntervalGrade) +
          conversion.MinIntervalGrade

    return convertedGrade.toFixed(2)
  }
}
