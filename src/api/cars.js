import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

export const getCars = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${BASE_URL}/cars`, { params });
  return response.data;
};

export const getCarById = async id => {
  const response = await axios.get(`${BASE_URL}/cars/${id}`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${BASE_URL}/brands`);
  return response.data;
};
