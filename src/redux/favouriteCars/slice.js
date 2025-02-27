import { createSlice } from '@reduxjs/toolkit';

const favouriteCarsSlice = createSlice({
  name: 'favouriteCars',
  initialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      state.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      return state.filter(car => car.id !== action.payload.id);
    },
  },
});

export const { addToFavourites, removeFromFavourites } =
  favouriteCarsSlice.actions;
export default favouriteCarsSlice.reducer;
