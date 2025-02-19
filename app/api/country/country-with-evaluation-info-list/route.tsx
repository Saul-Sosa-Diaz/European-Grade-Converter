/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date February 18 2025
 *
 * @description This file constains the api route to get a country list with evaluation info.
 */

import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';

export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter().getDBCountryRepository();
    const result = await databaseAdapter.getCountryWithEvaluationInfoList();
    return Response.json({ countries: result });
  } catch (error) {
    return Response.json({ error });
  }
}
