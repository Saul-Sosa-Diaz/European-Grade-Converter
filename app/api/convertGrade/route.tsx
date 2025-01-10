import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { grade, fromEvaluationSystemID, toEvaluationSystemID } = body;
    if (!grade || !fromEvaluationSystemID || !toEvaluationSystemID) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
    const databaseAdapter = createDatabaseAdapter();
    const spainGrade = await databaseAdapter.convertGrade({ evaluationSystemID: fromEvaluationSystemID, grade, direction: 'toSpanish' });
    const result = await databaseAdapter.convertGrade({ evaluationSystemID: toEvaluationSystemID, grade: parseFloat(spainGrade) });
    return Response.json({ convertedGrade: result });
  } catch (error) {
    return Response.json({ error });
  }
}
