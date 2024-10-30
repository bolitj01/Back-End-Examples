//Educational-Use example adapted from https://github.com/WebDevSimplified/Nodejs-User-Authentication
import express, { json } from "express";
import { hash, verify } from "argon2"; //See https://www.npmjs.com/package/argon2
import morgan from "morgan";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config(); //Load environment variables from .env file

const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

console.log(`Connecting to Redis at ${redisURL}`);

//Connect to redis cloud
const redisDB = createClient({
  url: redisURL,
});

redisDB.on('ready', () => console.log('Connected to Redis Cloud'));
redisDB.on('error', (err) => console.error('Redis connection error:', err));

await redisDB.connect();

const collection = "users";

const app = express();

app.use(express.static("client")); //Serve all files in the client folder
app.use(json()); //Parse JSON data into request body
app.use(express.urlencoded({ extended: true })); //Parse form data into request body
app.use(morgan("combined")); //Log any HTTP requests

app.get("/users/:username", async (req, res) => {
  const users = await redisDB.hGetAll(`${collection}:${req.params.username}`);
  res.json(users);
});

//Create new user
app.post("/users/create", async (req, res) => {
  try {
    const id = req.body.username;
    const newUser = { username: req.body.username};
    await redisDB.hSet(`users:${id}`, newUser);
    console.log(`Created user:`, newUser);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

//Login with username
app.post("/users/login", async (req, res) => {
  const user = await redisDB.hGetAll(`users:${req.body.username}`);
  console.log(`User:`, user);
  if (Object.keys(user).length === 0) {
    return res.status(400).send("Cannot find user");
  }
  res.send("Logged in!");
});

//Delete User
app.delete("/users/:username", async (req, res) => {
  try {
    await redisDB.del(`users:${req.params.username}`);
    res.status(204).send();
  } catch {
    res.status(500).send();
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
