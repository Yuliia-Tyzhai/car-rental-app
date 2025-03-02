import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favouriteCarsSlice = createSlice({
  name: 'favouriteCars',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      if (Array.isArray(state)) {
        const existingCar = state.find(car => car.id === action.payload.id);
        if (!existingCar) {
          state.push(action.payload);
        }
      }
    },
    removeFromFavourites: (state, action) => {
      if (Array.isArray(state)) {
        return state.filter(car => car.id !== action.payload);
      }
      return state;
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouriteCarsSlice.actions;
export default favouriteCarsSlice.reducer;
