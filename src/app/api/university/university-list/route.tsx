/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for retrieving the university list.
 * It handles the GET request, retrieves the university list from the database,
 * and returns the list in the response.
 *
 * @date February 18, 2025
 * @description This file has the route to get the university list.
 * @author Saul Sosa
 */
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';
export const revalidate = 0;
export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter().getDBUniversityRepository();
    const result = await databaseAdapter.getUniversityList();
    return Response.json({ universityList: result });
  } catch (error) {
    return Response.json({ error });
  }
}
