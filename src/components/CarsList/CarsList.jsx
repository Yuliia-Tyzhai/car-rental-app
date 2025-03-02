import React from 'react';
import CarCard from '../CarCard/CarCard';
import styles from './CarsList.module.css';

const CarsList = ({ cars }) => {
  if (!Array.isArray(cars) || cars.length === 0) {
    return <p>No cars available</p>;
  }

  return (
    <div className={styles.carsContainer}>
      <ul className={styles.carsList}>
        {cars.map(car => (
          <li key={car.id} className={styles.carItem}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsList;
