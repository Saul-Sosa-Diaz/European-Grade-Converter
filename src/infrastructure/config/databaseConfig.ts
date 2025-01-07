import { PostgresAdapter } from "../database/PostgresAdapter"

export function createDatabaseAdapter() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db'
  return new PostgresAdapter(connectionString)
}
