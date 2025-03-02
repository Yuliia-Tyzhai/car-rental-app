export const capitalizeFirstLetter = string => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatMileage = mileage => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatNumberWithCommas = num => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};

export const getAddressCityCountry = address => {
  const parts = address.split(',');
  const city = parts[parts.length - 2].trim();
  const country = parts[parts.length - 1].trim();
  return `${city} ${country}`;
};

export const getAddressCityCountrySec = address => {
  const parts = address.split(',');
  const city = parts[parts.length - 2].trim();
  const country = parts[parts.length - 1].trim();
  return `${city}, ${country}`;
};

export const getFirstFourDigits = id => id.slice(0, 4);
