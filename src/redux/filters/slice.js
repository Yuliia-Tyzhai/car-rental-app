import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brand: '',
    price: '',
    mileage: { from: '', to: '' },
  },
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setMileage: (state, action) => {
      state.mileage = action.payload;
    },
    resetFilters: state => {
      state.brand = '';
      state.price = '';
      state.mileage = { from: '', to: '' };
    },
  },
});

export const { setBrand, setPrice, setMileage, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
