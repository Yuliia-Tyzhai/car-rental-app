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
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Стан для запобігання подвійним запитам

  const hasMoreCars = currentPage < totalPages;

  useEffect(() => {
    // Початкове завантаження карток із фільтрами
    dispatch(fetchCars(searchParams));
  }, [dispatch, searchParams]);

  const handleLoadMore = () => {
    if (isLoadingMore) return; // Якщо вже йде завантаження, не дозволяємо новий запит
    setIsLoadingMore(true);
    dispatch(fetchMoreCars(searchParams)).finally(() => {
      setIsLoadingMore(false); // Після завершення запиту відновлюємо стан
    });
  };

  const handleSearch = params => {
    setSearchParams(params); // Оновлюємо параметри пошуку, що передаються на сервер
  };

  return (
    <div className={styles.catalogContainer}>
      <DocumentTitle>Catalog</DocumentTitle>
      <SearchBox onSearch={handleSearch} />
      {/* Лоадер для початкового завантаження */}
      {loading && <Loader loading={true} />}
      {error && <p>{error}</p>}
      <CarsList cars={cars} />

      {/* Лоадер для додаткових автомобілів */}
      {isLoadingMore && <Loader loading={true} />}

      {hasMoreCars && !loading && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonLoadMore}
            onClick={handleLoadMore}
            disabled={isLoadingMore} // Вимикаємо кнопку, якщо завантаження вже йде
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
