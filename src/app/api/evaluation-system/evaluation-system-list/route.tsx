/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for retrieving the evaluation system list.
 * It handles the GET request, retrieves the evaluation system list from the database,
 * and returns the list in the response.
 *
 * @date February 18, 2025
 * @description This file has the route to get the evaluation system list.
 * @author Saul Sosa
 */
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';
export const revalidate = 0;
export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter().getDBEvaluationSystemRepository();
    const result = await databaseAdapter.getEvaluationSystemList();
    const jsonResponse = JSON.stringify({ evaluationSystemList: result });
    return new Response(jsonResponse, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    const errorResponse = JSON.stringify({ error: "Internal Server Error", success: false });
    return new Response(errorResponse, {
      status: 500,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json'
      }
    });
  }
}
