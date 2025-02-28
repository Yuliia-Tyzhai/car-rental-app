import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../../api/cars';
import { formatMileage } from '../../utils/formatMileage';
import CarCard from '../../components/CarCard/CarCard';
import BookingForm from '../../components/BookingForm/BookingForm';

const CarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {car.brand} {car.model}, {car.year}
      </h1>
      <p>Id: {car.id}</p>
      <p>{car.address}</p>
      <p>Mileage: {formatMileage(car.mileage)} km</p>
      <p>${car.rentalPrice}</p>
      <p>{car.description}</p>
      <h3>Rental Conditions:</h3>
      <ul>
        {car.rentalConditions.map((condition, index) => (
          <li key={index}>{condition}</li>
        ))}
      </ul>
      <h3>Car Specifications:</h3>
      <p>Year: {car.year}</p>
      <p>Type: {car.type}</p>
      <p>Fuel Consumption: {car.fuelConsumption}</p>
      <p>Engine Size: {car.engineSize}</p>
      <h3>Accessories and Functionalities:</h3>
      <ul>
        {car.accessories.concat(car.functionalities).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <CarCard car={car} showReadMore={false} />
      <BookingForm car={car} />
    </div>
  );
};

export default CarPage;
