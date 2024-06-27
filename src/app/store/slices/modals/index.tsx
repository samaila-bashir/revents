/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  open: boolean;
  type: string | null;
  data?: any;
};

const initialState: State = {
  open: false,
  type: null,
  data: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      return {
        ...state,
        open: true,
        type: action.payload.type,
        data: action.payload.data,
      };
    },
    closeModal: (state) => ({
      ...state,
      open: false,
      type: null,
      data: null,
    }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
