
import { APIEvaluationSystem } from "@/domain/evaluationSystem/dto/ApiEvaluationSystem";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";


export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const evaluationSystemToDelete: APIEvaluationSystem = body;
    const databaseAdapter = createDatabaseAdapter();
    await databaseAdapter.deleteEvaluationSystem(evaluationSystemToDelete);
    await databaseAdapter.logUserActivity(session.user.name, new Date(), "Delete Evaluation System");
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error", success: false },
      { status: 500 });
  }
}
