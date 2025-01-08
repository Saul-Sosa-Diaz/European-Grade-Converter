import { Pool } from 'pg'
import { QUERIES } from './queries'

export class PostgresAdapter {
  private pool: Pool
  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
  }

  getCountries() {
    const QUERY = QUERIES.GET_COUNTRIES
    return this.pool.query(QUERY)
  }
}
