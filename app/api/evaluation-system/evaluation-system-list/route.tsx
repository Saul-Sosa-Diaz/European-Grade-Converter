import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getEvaluationSystemList();
    console.log(result);
    return Response.json({ evaluationSystemList: result });
  } catch (error) {
    return Response.json({ error });
  }
}
