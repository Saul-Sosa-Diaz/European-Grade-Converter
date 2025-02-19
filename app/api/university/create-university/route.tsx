/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for creating a university.
 * It handles the POST request, checks for user authorization, creates the university
 * in the database, and logs the user activity.
 *
 * @date February 18, 2025
 * @description This file has the route to create a university.
 * @author Saul Sosa
 */
import { APIUniversity } from "@/domain/university/dto/ApiUniversity";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const newUniversity: APIUniversity = body;
    if (!newUniversity.universityname || !newUniversity.countryid) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }
    const universityDatabaseAdapter = createDatabaseAdapter().getDBUniversityRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await universityDatabaseAdapter.createUniversity(newUniversity);
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Create University");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
