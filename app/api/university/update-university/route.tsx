
import { APIUniversity } from "@/domain/university/dto/ApiUniversity";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const universityToUpdate: APIUniversity = body;
    const databaseAdapter = createDatabaseAdapter();
    await databaseAdapter.updateUniversity(universityToUpdate);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
