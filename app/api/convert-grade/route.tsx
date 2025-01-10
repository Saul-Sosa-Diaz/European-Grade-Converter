import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    console.log('post /api/convert-grade');
    const body = await request.json();
    const { grade, fromEvaluationSystemID, toEvaluationSystemID } = body;
    if (!grade || !fromEvaluationSystemID || !toEvaluationSystemID) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
    
    const databaseAdapter = createDatabaseAdapter();
    console.log('grade', grade);
    console.log('fromEvaluationSystemID', fromEvaluationSystemID);
    const spainGrade = await databaseAdapter.convertGrade({ evaluationSystemID: fromEvaluationSystemID, grade: parseFloat(grade), direction: 'toSpanish' });
    console.log('grade', spainGrade);
    console.log('toEvaluationSystemID', toEvaluationSystemID);
    const result = await databaseAdapter.convertGrade({ evaluationSystemID: toEvaluationSystemID, grade: parseFloat(spainGrade) });
    return Response.json({ convertedGrade: result });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
