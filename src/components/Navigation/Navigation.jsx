import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';
import { ReactSVG } from 'react-svg';
import rentalCarLogo from '../../assets/header/rental-car-logo.svg';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

const Navigation = () => {
  return (
    <div>
      <header className={styles.header}>
      <Link to="/">
            <ReactSVG src={rentalCarLogo} />
      </Link>
        <nav className={styles.nav}>
            <ul>
                <li>
                  <NavLink to="/" className={buildLinkClass}>
                   Home
                  </NavLink>  
                </li>
                <li>
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