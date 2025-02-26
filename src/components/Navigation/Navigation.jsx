import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';
import { ReactSVG } from 'react-svg';
import rentalCarLogo from '../../assets/header/rental-car.svg';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

const Navigation = () => {
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <ReactSVG src={rentalCarLogo} width="104" height="16" />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink to="/" className={buildLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink to="/catalog" className={buildLinkClass}>
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
