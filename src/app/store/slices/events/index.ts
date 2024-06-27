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
    addEvent: (state, action: PayloadAction<AppEvent>) => {
      state.events.push(action.payload);
    },
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
