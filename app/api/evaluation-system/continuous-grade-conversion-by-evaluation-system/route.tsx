
import { GetContinuousGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository';
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    const body: GetContinuousGradeConversionListByEvaluationID.Params = await request.json();
    const databaseAdapter = createDatabaseAdapter();
    const result = await databaseAdapter.getContinouosGradeConversionListByEvaluationID(body.evaluationSystemID);
    return Response.json({ continuousGradeConversionListByEvaluationID: result });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}