/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date February 18 2025
 *
 * @description This file contains the api route to get the country list.
 */

import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';
export const revalidate = 0;
export async function GET() {
  try {
    const databaseAdapter = createDatabaseAdapter().getDBCountryRepository();
    const result = await databaseAdapter.getCountryList();
    return Response.json({ countries: result });
  } catch (error) {
    return Response.json({ error });
  }
}
