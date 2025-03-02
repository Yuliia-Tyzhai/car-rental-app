export const selectAllCars = state => state.cars.items;
export const selectCarsStatus = state => state.cars.loading;
export const selectCarsError = state => state.cars.error;
export const selectCurrentPage = state => state.cars.page;
export const selectTotalPages = state => state.cars.totalPages;
