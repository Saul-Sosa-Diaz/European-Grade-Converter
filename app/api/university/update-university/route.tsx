/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for updating a university.
 * It handles the PUT request, checks for user authorization, updates the university
 * in the database, and logs the user activity.
 *
 * @date February 18, 2025
 * @description This file has the route to update a university.
 * @author Saul Sosa
 */
import { APIUniversity } from "@/domain/university/dto/ApiUniversity";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const universityToUpdate: APIUniversity = body;
    const universityDatabaseAdapter = createDatabaseAdapter().getDBUniversityRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await universityDatabaseAdapter.updateUniversity(universityToUpdate);
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Update University");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
