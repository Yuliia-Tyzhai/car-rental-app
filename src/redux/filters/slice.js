import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    rentalPrice: '',
    mileage: { from: '', to: '' },
  },
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.rentalPrice = action.payload;
    },
    setMileage: (state, action) => {
      state.mileage = action.payload;
    },
    resetFilters: state => {
      state.brand = '';
      state.rentalPrice = '';
      state.mileage = { from: '', to: '' };
    },
  },
});

export const { setBrand, setPrice, setMileage, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
