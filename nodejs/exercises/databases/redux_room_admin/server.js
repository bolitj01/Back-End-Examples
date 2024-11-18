import mongoose from "mongoose";
import express from "express";

const app = express();

const remoteurl =
  "mongodb+srv://chester_the_tester:pfwcs@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs";
await mongoose.connect(remoteurl);

const port = 8080;

app.use(express.json());

//TODO Create routes for the following:
// POST /create-rooms
// POST /create-participant
// GET /waitingroom
// GET /rooms
// POST /api/join

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
