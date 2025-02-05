
import { ConverterDirection, createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { grade, fromEvaluationSystemID, toEvaluationSystemID, fixed, fromEvaluationType, toEvaluationType } = body;
    if (!grade || !fromEvaluationSystemID || !toEvaluationSystemID) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const databaseAdapter = createDatabaseAdapter();
    const spainGrade = await databaseAdapter.convertGrade({ evaluationSystemID: fromEvaluationSystemID, grade: grade, direction: ConverterDirection.toSpain, evaluationType: fromEvaluationType });
    const result = await databaseAdapter.convertGrade({ evaluationSystemID: toEvaluationSystemID, grade: spainGrade, evaluationType: toEvaluationType });

    return Response.json({ convertedGrade: typeof result === "string" ? result : result.toFixed(fixed) }); // If the result is a string it means that is a discrete grade
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
