import React from 'react';
import CarCard from '../CarCard/CarCard';

const CarsList = ({ cars }) => {
  if (!Array.isArray(cars) || cars.length === 0) {
    return <p>No cars available</p>;
  }

  return (
    <ul>
      {cars.map(car => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarsList;
