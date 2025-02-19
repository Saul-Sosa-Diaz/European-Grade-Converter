/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for deleting an evaluation system.
 * It handles the DELETE request, checks for user authorization, deletes the evaluation
 * system from the database, and logs the user activity.
 *
 * @date February 18, 2025
 * @description This file has the route to delete an evaluation system.
 * @author Saul Sosa
 */
import { APIEvaluationSystem } from "@/domain/evaluationSystem/dto/ApiEvaluationSystem";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const evaluationSystemToDelete: APIEvaluationSystem = body;
    const evaluationSystemAatabaseAdapter = createDatabaseAdapter().getDBEvaluationSystemRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await evaluationSystemAatabaseAdapter.deleteEvaluationSystem(evaluationSystemToDelete);
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Delete Evaluation System");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
