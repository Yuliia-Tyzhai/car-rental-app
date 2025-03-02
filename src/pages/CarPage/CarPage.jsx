import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../../api/cars';
import { formatMileage } from '../../utils/formatMileage';
import BookingForm from '../../components/BookingForm/BookingForm';
import { getFirstFourDigits } from '../../utils/getFirstFourDigits.js';
import { getAddressCityCountrySec } from '../../utils/getAddressCityCountry.js';
import styles from './CarPage.module.css';
import { ReactSVG } from 'react-svg';
import placeIcon from '../../assets/carPage/place.svg';
import pointIcon from '../../assets/carPage/point.svg';
import fuelPumpIcon from '../../assets/carPage/fuel-pump.svg';
import fixIcon from '../../assets/carPage/fix.svg';
import carIcon from '../../assets/carPage/car.svg';
import calendarIcon from '../../assets/carPage/calendar.svg';

const CarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        setError('Error fetching car details.');
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.carPageContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.carImg}>
          <img
            className={styles.carImg}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
          />
        </div>

        <BookingForm car={car} />
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.carDetails}>
          <div className={styles.carRow}>
            <h1 className={styles.carModel}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <p className={styles.carId}>Id: {getFirstFourDigits(car.id)}</p>
          </div>

          <div className={styles.carAddress}>
            <div>
              <ReactSVG src={placeIcon} />
              <p>{getAddressCityCountrySec(car.address)}</p>
            </div>
            <p>Mileage: {formatMileage(car.mileage)} km</p>
          </div>

          <p className={styles.rentalPrice}>${car.rentalPrice}</p>
          <p>{car.description}</p>
        </div>

        <div className={styles.carInfo}>
          <div className={styles.rentalConditions}>
            <h2>Rental Conditions:</h2>
            <ul>
              {car.rentalConditions.map((condition, index) => (
                <li key={index}>
                  <ReactSVG src={pointIcon} />
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.carSpecifications}>
            <h2>Car Specifications:</h2>
            <ul>
              <li>
                <ReactSVG src={calendarIcon} />
                Year: {car.year}
              </li>
              <li>
                <ReactSVG src={carIcon} />
                Type: {car.type}
              </li>
              <li>
                <ReactSVG src={fuelPumpIcon} />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <ReactSVG src={fixIcon} />
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>

          <div className={styles.functionalities}>
            <h2>Accessories and Functionalities:</h2>
            <ul>
              {car.accessories
                .concat(car.functionalities)
                .map((item, index) => (
                  <li key={index}>
                    <ReactSVG src={pointIcon} />
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
