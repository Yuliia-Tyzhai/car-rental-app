import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavourites,
  removeFromFavourites,
} from '../../redux/favouriteCars/slice';
import { formatMileage } from '../../utils/formatMileage';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { getAddressCityCountry } from '../../utils/getAddressCityCountry';
import styles from './CarCard.module.css';
import heartIcon from '../../assets/carCard/default.svg';
import heartIconBlue from '../../assets/carCard/active.svg';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favouriteCars = useSelector(state => state.favouriteCars.items); // Вибірка обраних автомобілів
  const isFavourite = favouriteCars.some(favCar => favCar.id === car.id);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(car.id)); // Видалення з обраних
      console.log('Removed from favourites:', car);
    } else {
      dispatch(addToFavourites(car)); // Додавання до обраних
      console.log('Added to favourites:', car);
    }
  };

  return (
    <div className={styles.carCard}>
      <div className={styles.iconWrapper} onClick={handleFavouriteClick}>
        <img
          src={isFavourite ? heartIconBlue : heartIcon}
          alt="Heart Icon"
          className={styles.icon}
        />
      </div>
      {car.img && (
        <img
          className={styles.carImg}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />
      )}
      <div className={styles.carInfo}>
        <div className={styles.carHeader}>
          <p className={styles.carDetails}>
            {car.brand}
            <span className={styles.carModel}> {car.model}</span>, {car.year}
          </p>
          <p className={styles.rentalPrice}>${car.rentalPrice}</p>
        </div>
        <div className={styles.detailsBlock}>
          <span className={styles.address}>
            {getAddressCityCountry(car.address)}
          </span>
          <span className={styles.rentalCompany}>{car.rentalCompany}</span>
          <br />
          <span className={styles.carType}>
            {capitalizeFirstLetter(car.type)}
          </span>
          <span>{formatMileage(car.mileage)} km</span>
        </div>

        <Link to={`/catalog/${car.id}`}>
          <button className={styles.buttonReadMore} type="button">
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
