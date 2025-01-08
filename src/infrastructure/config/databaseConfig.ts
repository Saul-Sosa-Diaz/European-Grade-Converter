import { PostgresAdapter } from "../database/postgresAdapter"

export function createDatabaseAdapter() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db'
  return new PostgresAdapter(connectionString)
}
