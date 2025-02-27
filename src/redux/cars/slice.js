import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById, fetchMoreCars } from './operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: initialState,

  reducers: {
    addFavorite: (state, action) => {
      state.items = state.items.map(car =>
        car.id === action.payload.id ? { ...car, favorite: true } : car
      );
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.page = 1;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMoreCars.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreCars.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.items) {
          state.items = action.payload.cars;
        } else {
          const newCars = action.payload.cars.filter(
            newCar => !state.items.some(car => car.id === newCar.id)
          );
          state.items = [...state.items, ...newCars];
        }
        state.page += 1;
      })
      .addCase(fetchMoreCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          car => car.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addFavorite } = carsSlice.actions;
export default carsSlice.reducer;
