import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getBrands, getCars } from '../../api/cars';
import styles from './SearchBox.module.css';

const validationSchema = Yup.object({
  brand: Yup.string(),
  price: Yup.number().positive('Price must be positive'),
  rentalPrice: Yup.number().positive('Rental price must be positive'),
  mileageFrom: Yup.number().positive('Mileage must be positive'),
  mileageTo: Yup.number().positive('Mileage must be positive'),
});

const SearchBox = ({ onSearch }) => {
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        console.log('Received brands:', brandsData);
        if (Array.isArray(brandsData)) {
          setBrands(brandsData);
        } else {
          console.error('Expected an array of brands:', brandsData);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    const fetchAllCars = async () => {
      let allCars = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const carsData = await getCars({ page });
          console.log(`Received cars on page ${page}:`, carsData);
          if (Array.isArray(carsData.cars)) {
            allCars = [...allCars, ...carsData.cars];
            totalPages = carsData.totalPages;
            page += 1;
          } else {
            console.error('Expected an array of cars:', carsData);
            break;
          }
        }

        const uniquePrices = [
          ...new Set(allCars.map(car => Number(car.rentalPrice))),
        ];
        uniquePrices.sort((a, b) => a - b);
        console.log('All unique prices:', uniquePrices);
        setPrices(uniquePrices);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchBrands();
    fetchAllCars();
  }, []);

  return (
    <Formik
      initialValues={{
        brand: '',
        price: '',
        rentalPrice: '',
        mileageFrom: '',
        mileageTo: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        onSearch({
          brand: values.brand,
          price: values.price,
          rentalPrice: values.rentalPrice,
          mileage: { from: values.mileageFrom, to: values.mileageTo },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.searchBox}>
          <div className={styles.formGroup}>
            <label htmlFor="brand">Car Brand</label>
            <Field as="select" name="brand" className={styles.select}>
              <option value="" label="Choose a brand" />
              {brands.map((brand, index) => (
                <option key={index} value={brand} label={brand} />
              ))}
            </Field>
            <ErrorMessage
              name="brand"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rentalPrice">Rental Price</label>
            <Field
              as="select"
              name="rentalPrice"
              className={styles.select}
              placeholder="Choose a price"
            >
              <option value="" label="Choose a price" />
              {prices.map((price, index) => (
                <option key={index} value={price} label={`${price}`} />
              ))}
            </Field>
            <ErrorMessage
              name="rentalPrice"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mileageFrom">Car Mileage/km</label>
            <Field type="number" name="mileageFrom" placeholder="From" />
            <Field type="number" name="mileageTo" placeholder="To" />
            <ErrorMessage
              name="mileageFrom"
              component="div"
              className={styles.error}
            />
            <ErrorMessage
              name="mileageTo"
              component="div"
              className={styles.error}
            />
          </div>
          <button
            className={styles.searchButton}
            type="submit"
            disabled={isSubmitting}
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBox;
