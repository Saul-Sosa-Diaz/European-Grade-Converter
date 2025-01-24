import { APICountry } from "@/domain/country/dto/ApiCountry";
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { countrycode, countryname }: APICountry = body;
    const databaseAdapter = createDatabaseAdapter();
    await databaseAdapter.createCountry({ countryid: null, countrycode, countryname });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message || "Internal Server Error", success: false },
      { status: 500 });
  }
}
