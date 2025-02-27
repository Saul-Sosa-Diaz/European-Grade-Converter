/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for updating an evaluation system.
 * It handles the PUT request, checks for user authorization, updates the evaluation
 * system in the database, and logs the user activity.
 *
 * @date February 18, 2025
 * @description This file has the route to update an evaluation system.
 * @author Saul Sosa
 */
import { APIEvaluationSystemWithGradeConversions } from "@/domain/evaluationSystem/dto/ApiEvaluationSystem";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const evaluationSystemToUpdate: APIEvaluationSystemWithGradeConversions = body;
    const evaluationSystemAatabaseAdapter = createDatabaseAdapter().getDBEvaluationSystemRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await evaluationSystemAatabaseAdapter.updateEvaluationSystem(evaluationSystemToUpdate);
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Update Evaluation System");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
