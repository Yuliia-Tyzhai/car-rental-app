import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchMoreCars } from '../../redux/cars/operations';
import {
  selectAllCars,
  selectCarsStatus,
  selectCarsError,
} from '../../redux/cars/selectors';
import SearchBox from '../../components/SearchBox/SearchBox';
import CarsList from '../../components/CarsList/CarsList';
import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const loading = useSelector(selectCarsStatus) === 'loading';
  const error = useSelector(selectCarsError);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    dispatch(fetchCars(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    console.log('cars:', cars); // Додайте цей рядок для перевірки
  }, [cars]);

  const handleLoadMore = () => {
    dispatch(fetchMoreCars(searchParams));
  };

  const handleSearch = params => {
    setSearchParams(params);
  };

  return (
    <div>
      <DocumentTitle>Catalog</DocumentTitle>
      <h1>Catalog</h1>
      <SearchBox onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <CarsList cars={cars} />
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default CatalogPage;
