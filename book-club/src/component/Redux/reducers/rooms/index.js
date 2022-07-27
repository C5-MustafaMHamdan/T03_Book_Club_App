import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
  },

  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },

    addRoom: (state, action) => {
      state.rooms.push(action.payload);
      console.log(action);
    },

     
    getRoomById: (state, action) => {
      state.rooms = state.rooms.filter((element) => {
        return element.id == action.payload;
      });
    },

    getAllMyRooms: (state, action) => {
      state.rooms = action.payload;
    },
    deleteRoom: (state, action) => {
      state.rooms = state.readingList.filter((room, index) => {
        return room.id != action.payload;
      });
    },
  },
});

export const {
  setRooms,
  addRoom,
   getAllMyRooms,
  deleteRoom,
  getRoomById,
} = roomsSlice.actions;

export default roomsSlice.reducer;
