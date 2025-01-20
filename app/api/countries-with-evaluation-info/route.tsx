import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getCountriesWithEvaluationInfoList();
    return Response.json({ countries: result });
  } catch (error) {
    return Response.json({ error });
  }
}
