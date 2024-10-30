import { MongoClient, ServerApiVersion } from "mongodb";


export async function GET() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();

    const countries = await client
      .db("GradeConversion")
      .collection("countries")
      .find({})
      .toArray();
    return Response.json({ countries });
  } catch (error) {
    return Response.json({ error });
  }
}
