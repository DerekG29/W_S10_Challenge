import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: { 
    size: 'All',
  },
  reducers: {
    setSizeFilter(state, action) {
      state.size = action.payload;
    },
  }
})

export default filterSlice.reducer;

export const {
  setSizeFilter,
} = filterSlice.actions;