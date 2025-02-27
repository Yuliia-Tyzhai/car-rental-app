export const selectAllCars = state => state.cars.items;
export const selectCarById = (state, carId) =>
  state.cars.items.find(car => car.id === carId);
export const selectCarsStatus = state => state.cars.status;
export const selectCarsError = state => state.cars.error;
export const selectCarsPage = state => state.cars.page;
