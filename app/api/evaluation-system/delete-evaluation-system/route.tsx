
import { APIUniversity } from "@/domain/university/dto/ApiUniversity";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const universityToDelete: APIUniversity = body;
    console.log(universityToDelete);
    const databaseAdapter = createDatabaseAdapter();
    await databaseAdapter.deleteUniversity(universityToDelete);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
