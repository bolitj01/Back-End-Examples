import mongoose from "mongoose";
import express from "express";

const app = express();

//TODO Create a schema and model for the participant and room

const remoteurl = 'mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs';
await mongoose.connect(remoteurl);

const port = 8080;

app.use(express.json());

//TODO Create API routes for the following:
// POST /create-rooms - create roomCount rooms
app.post("/create-rooms", async (req, res) => {
  const { roomCount } = req.body;
  for (let i = 0; i < roomCount; i++) {
    if (!(await Room.findOne({ number: i + 1 }))) {
      const room = new Room({ number: i + 1, participants: [] });
      await room.save();
    }
  }
  res.send(`Created ${roomCount} rooms`);
});

// POST /create-participant - no duplicate names
// GET /waitingroom - all participants not in a room
// GET /rooms - all rooms with participants populated
// POST /join - put participant in a room and remove from previous room

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
