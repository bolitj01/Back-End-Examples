/*
  Refer to https://www.edx.org/course/introduction-to-nodejs by Azat Mardan
*/

import { MongoClient } from "mongodb";

const remoteurl =
  "mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs";

async function run() {
  const client = new MongoClient(remoteurl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db("course-db");
    console.log("Connected to " + db.databaseName);

    const collection = db.collection("course-students");

    // Insert 3 documents
    const insertResult = await collection.insertMany([
      { name: "Bob" },
      { name: "John" },
      { name: "Peter" },
    ]);
    console.log(insertResult.insertedCount, "documents inserted");

    // Update a document
    const nameToUpdate = "Peter";
    const updateResult = await collection.updateOne(
      { name: nameToUpdate },
      { $set: { grade: "A" } }
    );
    console.log(updateResult.modifiedCount, `document(s) updated where name = ${nameToUpdate}`);

    // Remove a document
    const nameToRemove = "Bob";
    const deleteResult = await collection.deleteOne({ name: nameToRemove });
    console.log(deleteResult.deletedCount, `document(s) removed where name = ${nameToRemove}`);

    // Find documents
    const docs = await collection.find({}).toArray();
    console.log(docs.length, "documents found:");
    console.dir(docs);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run().catch((err) => {
  console.error("Unhandled error:", err);
});
