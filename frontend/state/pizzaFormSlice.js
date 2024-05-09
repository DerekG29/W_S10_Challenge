import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const pizzaFormSlice = createSlice({
  name: 'pizzaForm',
  initialState: initialState,
  reducers: {
     setName(state, action) {
      state.fullName = action.payload;
     },
     setSize(state, action) {
      state.size = action.payload;
     },
     setToppings(state, action) {
      state[action.payload] = !state[action.payload];
     },
     resetForm: () => initialState,
  }
})

export default pizzaFormSlice.reducer;

export const {
  setName,
  setSize,
  setToppings,
  resetForm,
} = pizzaFormSlice.actions;