import { combineReducers } from "@reduxjs/toolkit";
import eventReducer from "./events";
import modalReducer from "./modals";

export const rootReducer = combineReducers({
  events: eventReducer,
  modals: modalReducer,
});
