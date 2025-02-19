/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for updating a country.
 * It handles the PUT request, checks for user authorization, updates the country
 * information in the database, and logs the user activity.
 *
 * @date February 18, 2025
 * @description This file has the route to update a country.
 * @author Saul Sosa
 */

import { APICountry } from "@/domain/country/dto/ApiCountry";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { countryid, countrycode, countryname }: APICountry = body;
    const countryDatabaseAdapter = createDatabaseAdapter().getDBCountryRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await countryDatabaseAdapter.updateCountry({ countryid, countrycode, countryname });
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Update Country");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
