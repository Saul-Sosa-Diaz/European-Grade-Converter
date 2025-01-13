import { ConverterDirection, createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { grade, fromEvaluationSystemID, toEvaluationSystemID, fixed } = body;
    if (!grade || !fromEvaluationSystemID || !toEvaluationSystemID) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const databaseAdapter = createDatabaseAdapter();
    const spainGrade = await databaseAdapter.convertGrade({ evaluationSystemID: fromEvaluationSystemID, grade: parseFloat(grade), direction: ConverterDirection.toSpain });
    const result = await databaseAdapter.convertGrade({ evaluationSystemID: toEvaluationSystemID, grade: spainGrade });

    return Response.json({ convertedGrade: result.toFixed(fixed) });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
