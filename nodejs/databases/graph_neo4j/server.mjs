import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import cors from "cors";
import neo4j from "neo4j-driver";
config();

let driver;

//Connect to Neo4j Aura database
(async () => {
  const URI = process.env.NEO4J_URI;
  const USER = process.env.NEO4J_USERNAME;
  const PASSWORD = process.env.NEO4J_PASSWORD;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log("Connection established");
    console.log(serverInfo);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
})();

const app = express();
const port = 8080;

// Get __dirname in es6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildFolder = "dist";
console.log("__dirname: ", __dirname);

//Accept outside requests (add configuration in production)
app.use(cors());

// Server build folder from React
app.use(express.static(path.join(__dirname, buildFolder)));
app.use(express.json());

// Serve index.html from React build folder
app.get("/", (req, res) => {
  console.log("Home Page");
  res.sendFile(path.resolve(__dirname, buildFolder, "index.html"));
});

// Query all friends of a user by name
app.get("/friends/:name", async (req, res) => {
  //Capitalize the first letter of the name parameter
  const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);

  // return an aliased scalar so record.get('friend') works
  const query = `
    MATCH (u:User {Name: $name})-[:FRIEND_WITH]->(f)
    RETURN f.Name AS friend
  `;
  const params = { name };

  try {
    let {records} = await driver.executeQuery(query, params);
    console.log("records:", records.length);
    // map the aliased scalar
    const friends = records.map((r) => r.get("friend"));
    res.json(friends);
  } catch (err) {
    console.error("friends query error:", err);
    res.status(500).send(err.message || err);
  }
});

// Suggest 20 random friends of friends
app.get("/friend-suggestions/:name", async (req, res) => {
  //Capitalize the first letter of the name parameter
  const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
  
  const query = `
    MATCH (u:User {Name: $name})-[:FRIEND_WITH]->(:User)-[:FRIEND_WITH]->(suggestion:User)
    WHERE NOT (u)-[:FRIEND_WITH]->(suggestion)
    RETURN DISTINCT suggestion.Name AS suggestedFriend
    ORDER BY rand()
    LIMIT 20
  `;
  const params = { name };

  try {
    let {records} = await driver.executeQuery(query, params);
    console.log("suggestions records:", records.length);
    const suggestions = records.map((r) => r.get("suggestedFriend"));
    res.json(suggestions);
  } catch (err) {
    console.error("suggestions query error:", err);
    res.status(500).send(err.message || err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
