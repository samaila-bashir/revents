import { combineReducers } from "@reduxjs/toolkit";
import eventReducer from "./events";
import modalReducer from "./modals";
import authReducer from "./auth";

export const rootReducer = combineReducers({
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
});
