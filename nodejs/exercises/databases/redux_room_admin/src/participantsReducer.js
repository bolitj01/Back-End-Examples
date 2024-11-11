// participantsReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

/**
 * Participant structure:
 * {
 *  id: string,
 *  name: string,
 * }
 */

/**
 * Room Structure:
 * [participants: []],
 */

const roomCount = 9;

const initialState = {
  waitingRoom: [], // Participants in the waiting room
  rooms: Array.from({ length: roomCount }, (_, i) => []), // Array of rooms by #
  roomCount: roomCount,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addParticipant: (state, action) => {
      // New participant is added to the waiting room
      state.waitingRoom.push({
        id: v4(),
        name: action.payload,
      });
    },
    removeParticipant: (state, action) => {
      const { participantId } = action.payload;
      state.rooms.forEach((room) => {
        const index = room.findIndex((p) => p.id === participantId);
        state.waitingRoom.push(room[index]); // Add participant back to waiting room
        if (index !== -1) {
          room.splice(index, 1); // Remove participant from room
        }
      });
    },
    addToRoom: (state, action) => {
      const { participantId, roomIndex } = action.payload;
      //Find the participant in either the waiting room or other rooms
      //Remove the participant from that room
      //Add the participant to rooms[roomIndex]
      let participant = state.waitingRoom.find((p) => p.id === participantId);
      if (participant) {
        state.waitingRoom = state.waitingRoom.filter(
          (p) => p.id !== participantId
        );
      } else {
        state.rooms.forEach((room) => {
          const index = room.findIndex((p) => p.id === participantId);
          if (index !== -1) {
            participant = room[index];
            room.splice(index, 1);
          }
        });
      }
      state.rooms[roomIndex].push(participant);
    },
  },
});

export const { addParticipant, removeParticipant, addToRoom } =
  roomsSlice.actions;

export default roomsSlice.reducer;
