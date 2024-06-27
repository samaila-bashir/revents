import { combineReducers } from "@reduxjs/toolkit";
import eventReducer from "./events";

export const rootReducer = combineReducers({
  events: eventReducer,
});
