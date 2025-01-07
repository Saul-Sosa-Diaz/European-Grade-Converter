import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getCountries();
    return Response.json({ countries: result.rows });
  } catch (error) {
    return Response.json({ error });
  }
}
