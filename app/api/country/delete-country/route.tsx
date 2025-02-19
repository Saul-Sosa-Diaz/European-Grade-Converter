/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date February 18 2025
 *
 * @description This file constains the api route to delete a country.
 */

import { APICountry } from "@/domain/country/dto/ApiCountry";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { countryid, countrycode, countryname }: APICountry = body;
    const countryDatabaseAdapter = createDatabaseAdapter().getDBCountryRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await countryDatabaseAdapter.deleteCountry({ countryid, countrycode, countryname });
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Delete Country");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
