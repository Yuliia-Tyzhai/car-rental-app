import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCars } from '../../api/cars';
import { setBrand, setPrice, setMileage } from '../../redux/filters/slice';
import styles from './SearchBox.module.css';
import arrowDown from '../../assets/searchBox/chevron-down-icon.svg';
import arrowUp from '../../assets/searchBox/chevron-up-icon.svg';
import { searchBoxValidationSchema } from '../../utils/validationSchemas';
import { formatNumberWithCommas } from '../../utils/formatUtils';

const SearchBox = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { brand, rentalPrice, mileage } = useSelector(state => state.filters);

  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  const [mileages, setMileages] = useState([]);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
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
          if (Array.isArray(carsData.cars)) {
            allCars = [...allCars, ...carsData.cars];
            totalPages = carsData.totalPages;
            page += 1;
          } else {
            console.error('Expected an array of cars:', carsData);
            break;
          }
        }

        const uniqueMileages = [...new Set(allCars.map(car => car.mileage))];
        uniqueMileages.sort((a, b) => a - b);
        setMileages(uniqueMileages);

        const uniquePrices = [...new Set(allCars.map(car => car.rentalPrice))];
        uniquePrices.sort((a, b) => a - b);
        setPrices(uniquePrices);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchBrands();
    fetchAllCars();
  }, []);

  const toggleBrandDropdown = () =>
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);

  const handleSearchSubmit = values => {
    dispatch(setBrand(values.brand));
    dispatch(setPrice(values.rentalPrice));
    dispatch(setMileage({ from: values.mileageFrom, to: values.mileageTo }));

    onSearch({
      brand: values.brand,
      rentalPrice: values.rentalPrice,
      mileage: { from: values.mileageFrom, to: values.mileageTo },
    });
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          brand: brand || '',
          rentalPrice: rentalPrice || '',
          mileageFrom: mileage.from || '',
          mileageTo: mileage.to || '',
        }}
        validationSchema={searchBoxValidationSchema}
        onSubmit={handleSearchSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.searchBox}>
            <div className={styles.formGroup}>
              <label htmlFor="brand">Car Brand</label>
              <div className={styles.dropdownContainer}>
                <Field
                  as="select"
                  name="brand"
                  className={styles.select}
                  onClick={toggleBrandDropdown}
                >
                  <option value="" label="Choose a brand" />
                  {brands.map((brand, index) => (
                    <option key={index} value={brand} label={brand} />
                  ))}
                </Field>
                <img
                  src={isBrandDropdownOpen ? arrowUp : arrowDown}
                  alt="toggle"
                  className={styles.dropdownIcon}
                />
              </div>
              <ErrorMessage
                name="brand"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rentalPrice">Rental Price</label>
              <div className={styles.dropdownContainer}>
                <Field
                  as="select"
                  name="rentalPrice"
                  className={styles.select}
                  onClick={togglePriceDropdown}
                >
                  <option value="" label="Choose a price" />
                  {prices.map((price, index) => (
                    <option
                      key={index}
                      value={price}
                      label={price ? price.toString() : ''}
                    />
                  ))}
                </Field>
                <img
                  src={isPriceDropdownOpen ? arrowUp : arrowDown}
                  alt="toggle"
                  className={styles.dropdownIcon}
                />
              </div>
              <ErrorMessage
                name="rentalPrice"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.mileageContainer}>
                <label htmlFor="mileageFrom">Car Mileage/km</label>
                <div className={styles.mileageFields}>
                  <Field
                    as="select"
                    name="mileageFrom"
                    className={styles.selectMileageFrom}
                    value={values.mileageFrom}
                    onChange={e => {
                      setFieldValue('mileageFrom', e.target.value);
                    }}
                  >
                    <option value="" label="From" />
                    {mileages.map((mileage, index) => (
                      <option key={index} value={mileage}>
                        {mileage
                          ? `From ${formatNumberWithCommas(mileage)}`
                          : 'From N/A'}
                      </option>
                    ))}
                  </Field>

                  <Field
                    as="select"
                    name="mileageTo"
                    className={styles.selectMileageTo}
                    value={values.mileageTo}
                    onChange={e => {
                      setFieldValue('mileageTo', e.target.value);
                    }}
                  >
                    <option value="" label="To" />
                    {mileages.map((mileage, index) => (
                      <option key={index} value={mileage}>
                        {mileage
                          ? `To ${formatNumberWithCommas(mileage)}`
                          : 'To N/A'}
                      </option>
                    ))}
                  </Field>
                </div>
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
            </div>

            <div className={styles.buttonContainer}>
              <button className={styles.searchButton} type="submit">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBox;
