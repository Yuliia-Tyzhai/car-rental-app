import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global/cars';

export const getCars = async ({ brand, price, mileage, page = 1 }) => {
  const params = new URLSearchParams();
  if (brand) params.append('brand', brand);
  if (price) params.append('price', price);
  if (mileage?.from) params.append('mileage_from', mileage.from);
  if (mileage?.to) params.append('mileage_to', mileage.to);
  params.append('page', page);

  const response = await axios.get(`${BASE_URL}?${params.toString()}`);
  return response.data;
};

export const getCarById = async id => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
