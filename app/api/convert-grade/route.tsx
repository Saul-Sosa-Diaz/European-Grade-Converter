import { EvaluationType } from '@/domain/country/country';
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

    if (toEvaluationType === EvaluationType.CONTINUOUS) {
      return Response.json({ convertedGrade: result.toFixed(fixed) });
    } else {
      return Response.json({ convertedGrade: result });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
