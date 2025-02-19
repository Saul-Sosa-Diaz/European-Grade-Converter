/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the route handler for creating an evaluation system.
 * It handles the POST request, checks for user authorization, creates the evaluation
 * system in the database, and logs the user activity.
 *
 * @date February 18, 2025
 * @description This file has the route to create an evaluation system.
 * @author Saul Sosa
 */

import { APIEvaluationSystemWithGradeConversions } from "@/domain/evaluationSystem/dto/ApiEvaluationSystem";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const newEvaluationSystem: APIEvaluationSystemWithGradeConversions = body;
    const evaluationSystemAatabaseAdapter = createDatabaseAdapter().getDBEvaluationSystemRepository();
    const authDatabaseAdapter = createDatabaseAdapter().getdbAuthRepository();
    await evaluationSystemAatabaseAdapter.createEvaluationSystem(newEvaluationSystem);
    await authDatabaseAdapter.logUserActivity(session.user.name, new Date(), "Create Evaluation System");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
