//Educational-Use example adapted from https://github.com/WebDevSimplified/Nodejs-User-Authentication
import express, { json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";
import { hash, verify } from "argon2";

dotenv.config(); //Load environment variables from .env file

const app = express();

app.use(express.static("client")); //Serve all files in the client folder
app.use(json()); //Parse JSON data into request body
app.use(express.urlencoded({ extended: true })); //Parse form data into request body
app.use(morgan("combined")); //Log any HTTP requests

//Middleware to see if users file has any data
const hasUsers = async (req, res, next) => {
  const data = await readFile("users.json", "utf-8");
  if (data) {
    req.users = JSON.parse(data);
    next();
  } else {
    res.status(404).send('No users in the "database"');
  }
};

app.get("/profile/:username", hasUsers, async (req, res) => {
  const user = req.users.find((user) => user.username === req.params.username);
  if (user === undefined) {
    return res.status(404).send("Cannot find user");
  }
  if (!user.loggedIn) {
    return res.status(401).send("User not logged in");
  }
  res.send(user);
});

//Create new user
app.post("/users/create", async (req, res) => {
  try {
    const users = JSON.parse(await readFile("users.json", "utf-8"));
    if (users === "") {
      users = [];
    }
    if (users.find((user) => user.username === req.body.username)) {
      return res.status(409).send("Username already exists");
    }
    const newUser = {
      username: req.body.username,
      password: await hash(req.body.password),
      loggedIn: false,
    };
    users.push(newUser);
    await writeFile("users.json", JSON.stringify(users));
    res.status(201).send(`Created user: ${newUser.username}`);
  } catch {
    res.status(500).send();
  }
});

//Login with username
app.post("/users/login", hasUsers, async (req, res) => {
  const user = req.users.find((user) => user.username === req.body.username);
  console.log(`User:`, user);
  if (user === undefined) {
    return res.status(401).send("Cannot find user");
  }
  const valid = await verify(user.password, req.body.password);
  if (!valid) {
    return res.status(401).send("Invalid password");
  }
  user.loggedIn = true;
  await writeFile("users.json", JSON.stringify(req.users));
  res.send("Logged in!");
});

//Logout with username
app.post("/users/logout", hasUsers, async (req, res) => {
  const user = req.users.find((user) => user.username === req.body.username);
  if (user === undefined) {
    return res.status(401).send("Cannot find user");
  }
  user.loggedIn = false;
  await writeFile("users.json", JSON.stringify(req.users));
  res.send("Logged out!");
});

//Delete User
app.delete("/users/:username", hasUsers, async (req, res) => {
  try {
    const users = JSON.parse(await readFile("users.json", "utf-8"));
    const filteredUsers = users.filter(
      (user) => user.username !== req.params.username
    );
    await writeFile("users.json", JSON.stringify(filteredUsers));
    res.status(204).send();
  } catch {
    res.status(500).send();
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
