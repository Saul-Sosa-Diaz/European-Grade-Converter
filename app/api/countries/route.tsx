import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://alu0101404141:pymKW3xW3uJ9qJNR@gradeconversion.vu8ee.mongodb.net/?retryWrites=true&w=majority&appName=gradeConversion";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export async function GET() {
  try {
    const client = new MongoClient(uri, {
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
    console.log(countries);
    return Response.json({ countries });
  } catch (error) {
    return Response.json({ error });
  }
}
