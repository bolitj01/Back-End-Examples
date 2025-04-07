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

//Query all friends of a user by name
app.get("/friends/:name", (req, res) => {
  const session = driver.session();
  const name = req.params.name;
  const query = `MATCH (u1:User)-[:FRIEND_WITH]->(u2:User) 
                    WHERE u1.name = $name 
                    RETURN u2.name AS friend`;
  const params = { name: name };
  session
    .run(query, params)
    .then((result) => {
      const friends = result.records.map((record) => record.get("friend"));
      res.json(friends);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
    .finally(() => session.close());
});

//Suggest 20 random friends of friends
app.get("/friend-suggestions/:name", (req, res) => {
  const session = driver.session();
  const name = req.params.name;
  const query = `MATCH (u1:User)-[:FRIEND_WITH]->(f:User)-[:FRIEND_WITH]->(ff:User)
                    WHERE u1.name = $name AND NOT (u1)-[:FRIEND_WITH]->(ff) AND ff <> u1
                    ORDER BY rand()
                    LIMIT 20
                    RETURN ff.name AS suggestedFriend;`;
  const params = { name: name };
  session
    .run(query, params)
    .then((result) => {
      const suggestions = result.records.map((record) =>
        record.get("suggestedFriend")
      );
      res.json(suggestions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
    .finally(() => session.close());
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
