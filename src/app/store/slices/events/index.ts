import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppEvent } from "../../../types/events";
import { Timestamp } from "firebase/firestore";

type State = {
  events: AppEvent[];
};

const initialState: State = {
  events: [],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: {
      reducer: (state, action: PayloadAction<AppEvent[]>) => {
        state.events = action.payload;
      },
      prepare: (events: any) => {
        const mapped = events.map((e: any) => {
          return { ...e, date: (e.date as Timestamp).toDate().toISOString() };
        });

        return { payload: mapped };
      },
    },
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

export const { createEvent, updateEvent, deleteEvent, setEvents } =
  eventSlice.actions;

export default eventSlice.reducer;
