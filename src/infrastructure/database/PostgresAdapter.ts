// infrastructure/database/PostgresAdapter.ts
import { Pool } from 'pg'

export class PostgresAdapter {
  private pool: Pool
  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
  }

  getCountries() {
    const QUERY = `SELECT COUNTRY.countryID, UNIVERSITY.universityID, universityName, evaluationSystemName, countryCode, countryName, validGrades
                    from UNIVERSITY 
                    JOIN COUNTRY ON UNIVERSITY.countryID = COUNTRY.countryID 
                    JOIN EVALUATION_SYSTEM ON UNIVERSITY.universityID = EVALUATION_SYSTEM.universityID`
    return this.pool.query(QUERY)
  }
}
