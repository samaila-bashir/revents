import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppEvent } from "../../../types/events";
import { sampleData } from "../../../api/sampleData";

type State = {
  events: AppEvent[];
};

const initialState: State = {
  events: sampleData,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<AppEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<AppEvent>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      state.events[index] = action.payload;
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;
