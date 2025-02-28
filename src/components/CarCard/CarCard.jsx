import React from 'react';
import { Link } from 'react-router-dom';
import { formatMileage } from '../../utils/formatMileage';

const CarCard = ({ car }) => (
  <div>
    <h2>
      {car.brand} {car.model}
    </h2>
    <p>Price: {car.rentalPrice}</p>
    <p>Mileage: {formatMileage(car.mileage)}</p>{' '}
    {car.img && <img src={car.img} alt={`${car.brand} ${car.model}`} />}
    <Link to={`/catalog/${car.id}`}>Read more</Link>
  </div>
);

export default CarCard;
