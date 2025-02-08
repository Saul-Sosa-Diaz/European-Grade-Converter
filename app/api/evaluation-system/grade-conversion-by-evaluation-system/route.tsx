
import { GetGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository';
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    const body: GetGradeConversionListByEvaluationID.Params = await request.json();
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getGradeConversionListByEvaluationID(body.evaluationSystemID);
    console.log(result);
    return Response.json({ continuousGradeConversionListByEvaluationID: result });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error", success: false },);
  }
}