import React from 'react';
import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <DocumentTitle>Home</DocumentTitle>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.paragraph}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog">
          <button className={styles.mainButton} type="button">
            View Catalog
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
