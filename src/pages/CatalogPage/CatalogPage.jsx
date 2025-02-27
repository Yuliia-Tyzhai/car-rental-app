import React, { useEffect } from 'react';
import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchMoreCars } from '../../redux/cars/operations';
import {
  selectAllCars,
  selectCarsStatus,
  selectCarsError,
} from '../../redux/cars/selectors';
import SearchBox from '../../components/SearchBox/SearchBox';
import CarCard from '../../components/CarCard/CarCard';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const status = useSelector(selectCarsStatus);
  const error = useSelector(selectCarsError);

  useEffect(() => {
    dispatch(fetchCars({}));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchMoreCars({}));
  };

  return (
    <div>
      <DocumentTitle>Catalog</DocumentTitle>
      <div>
        <SearchBox />
        {status === 'loading' && <div>Loading...</div>}
        {status === 'succeeded' && (
          <div>
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        )}
        {status === 'failed' && <div>Error: {error}</div>}
      </div>
    </div>
  );
};

export default CatalogPage;
