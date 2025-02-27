/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for retrieving grade conversions by evaluation system ID.
 * It handles the POST request, retrieves the grade conversions from the database,
 * and returns the list in the response.
 *
 * @date February 18, 2025
 * @description This file has the route to get grade conversions by evaluation system ID.
 * @author Saul Sosa
 */
import { GetGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository';
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function POST(request: Request) {
  try {
    const body: GetGradeConversionListByEvaluationID.Params = await request.json();
    const databaseAdapter = createDatabaseAdapter().getDBEvaluationSystemRepository();
    const result = await databaseAdapter.getGradeConversionListByEvaluationID(body.evaluationSystemID.toString());
    return Response.json({ continuousGradeConversionListByEvaluationID: result });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error", success: false },);
  }
}