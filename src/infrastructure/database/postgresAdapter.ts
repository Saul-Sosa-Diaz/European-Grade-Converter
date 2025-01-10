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
    console.log('conversion', conversion)
   const minIntervalGrade = Number(conversion.minintervalgrade)
   const maxIntervalGrade = Number(conversion.maxintervalgrade)
   const baseEquivalentSpanishGrade = Number(conversion.baseequivalentspanishgrade)
   const topEquivalentSpanishGrade = Number(conversion.topequivalentspanishgrade)
    const convertedGrade =
      direction === 'toSpanish'
        ? ((grade - minIntervalGrade) / (maxIntervalGrade - minIntervalGrade)) *
            (topEquivalentSpanishGrade - baseEquivalentSpanishGrade) +
          baseEquivalentSpanishGrade
        : ((grade - baseEquivalentSpanishGrade) /
            (topEquivalentSpanishGrade - baseEquivalentSpanishGrade)) *
            (maxIntervalGrade - minIntervalGrade) +
          minIntervalGrade
    console.log('convertedGrade', convertedGrade)
    return convertedGrade.toFixed(2)
  }
}
