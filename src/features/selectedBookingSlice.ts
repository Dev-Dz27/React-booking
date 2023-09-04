// selectedBookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarDataType } from "data/types";


const selectedCarSlice  = createSlice({
  name: "selectedCar",
  initialState: null,
  reducers: {
   
  },
});

export const { } = selectedCarSlice.actions;
export default selectedCarSlice.reducer;