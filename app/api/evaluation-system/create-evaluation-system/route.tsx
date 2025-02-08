

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
    const databaseAdapter = createDatabaseAdapter();
    await databaseAdapter.createEvaluationSystem(newEvaluationSystem);
    await databaseAdapter.logUserActivity(session.user.name, new Date(), "Create Evaluation System");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
