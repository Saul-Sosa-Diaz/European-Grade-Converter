import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://alu0101404141:pymKW3xW3uJ9qJNR@gradeconversion.vu8ee.mongodb.net/?retryWrites=true&w=majority&appName=gradeConversion";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


export async function GET(req: Request) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return Response.json({ message: "Pinged your deployment. You successfully connected to MongoDB!" });
    
  } catch (error) {
    console.error(error);
    }
  }
