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
