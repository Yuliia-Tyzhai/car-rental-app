import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchMoreCars } from '../../redux/cars/operations';
import {
  selectAllCars,
  selectCarsStatus,
  selectCarsError,
  selectCurrentPage,
  selectTotalPages,
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
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const [searchParams, setSearchParams] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMoreCars = currentPage < totalPages;

  useEffect(() => {
    dispatch(fetchCars(searchParams));
  }, [dispatch, searchParams]);

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    dispatch(fetchMoreCars(searchParams)).finally(() => {
      setIsLoadingMore(false);
    });
  };

  const handleSearch = params => {
    setSearchParams(params);
  };

  return (
    <div className={styles.catalogContainer}>
      <DocumentTitle>Catalog</DocumentTitle>
      <SearchBox onSearch={handleSearch} />

      {loading && <Loader loading={true} />}
      {error && <p>{error}</p>}
      <CarsList cars={cars} />

      {isLoadingMore && <Loader loading={true} />}

      {hasMoreCars && !loading && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonLoadMore}
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
