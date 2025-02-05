import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getUniversityList();
    return Response.json({ universityList: result });
  } catch (error) {
    return Response.json({ error });
  }
}
