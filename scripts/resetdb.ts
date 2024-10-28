import { MongoClient, ServerApiVersion } from "mongodb";
import { COUNTRIES } from "./countries.js";
const uri =
  "mongodb+srv://alu0101404141:pymKW3xW3uJ9qJNR@gradeconversion.vu8ee.mongodb.net/?retryWrites=true&w=majority&appName=gradeConversion";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}

export async function write() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    await client.db("GradeConversion").collection("countries").deleteMany({});
    await client
      .db("GradeConversion")
      .collection("countries")
      .insertMany(COUNTRIES);
  } finally {
    await client.close();
  }
}

async function read() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const countries = await client
      .db("GradeConversion")
      .collection("countries")
      .find({})
      .toArray();
    console.log(countries);
  } finally {
    await client.close();
  }
}

await write();
await read();
