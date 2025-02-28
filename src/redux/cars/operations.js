// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getCars, getCarById } from '../../api/cars';

// export const fetchCars = createAsyncThunk('cars/fetchCars', async filters => {
//   const data = await getCars(filters);
//   return data;
// });

// export const fetchMoreCars = createAsyncThunk(
//   'cars/fetchMoreCars',
//   async (filters, { getState }) => {
//     const state = getState();
//     const currentPage = state.cars.page;
//     const data = await getCars({ ...filters, page: currentPage + 1 });
//     return data;
//   }
// );

// export const fetchCarById = createAsyncThunk('cars/fetchCarById', async id => {
//   const data = await getCarById(id);
//   return data;
// });

// src/redux/cars/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCars, getCarById } from '../../api/cars';

export const fetchCars = createAsyncThunk('cars/fetchCars', async filters => {
  const data = await getCars(filters);
  return data;
});

export const fetchMoreCars = createAsyncThunk(
  'cars/fetchMoreCars',
  async (filters, { getState }) => {
    const state = getState();
    const currentPage = state.cars.page;
    const data = await getCars({ ...filters, page: currentPage + 1 });
    return data;
  }
);

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async id => {
  const data = await getCarById(id);
  return data;
});
