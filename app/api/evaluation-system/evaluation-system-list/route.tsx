import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getEvaluationSystemList();
    return Response.json({ evaluationSystemList: result });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error", success: false });
  }
}
