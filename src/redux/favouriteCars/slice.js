import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favouriteCarsSlice = createSlice({
  name: 'favouriteCars',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const existingCar = state.items.find(car => car.id === action.payload.id);
      if (!existingCar) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      state.items = state.items.filter(car => car.id !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouriteCarsSlice.actions;

export default favouriteCarsSlice.reducer;
