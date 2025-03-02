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
import Loader from '../../components/Loader/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const loading = useSelector(selectCarsStatus) === 'loading';
  const error = useSelector(selectCarsError);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    dispatch(fetchCars(searchParams));
  }, [dispatch, searchParams]);

  const handleLoadMore = () => {
    dispatch(fetchMoreCars(searchParams));
  };

  const handleSearch = params => {
    setSearchParams(params);
  };

  return (
    <div className={styles.catalogContainer}>
      <DocumentTitle>Catalog</DocumentTitle>
      <SearchBox onSearch={handleSearch} />
      <Loader loading={loading} />
      {error && <p>{error}</p>}
      <CarsList cars={cars} />
      <div className={styles.buttonContainer}>
        <button className={styles.buttonLoadMore} onClick={handleLoadMore}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default CatalogPage;
