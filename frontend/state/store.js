import { configureStore } from '@reduxjs/toolkit';
import { pizzaApi } from './pizzaApi';
import pizzaFormReducer from './pizzaFormSlice';
import filterReducer from './filterSlice';

export const resetStore = () => configureStore({
  reducer: {
    pizzaForm: pizzaFormReducer,
    filters: filterReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
  ),
})

export const store = resetStore()
