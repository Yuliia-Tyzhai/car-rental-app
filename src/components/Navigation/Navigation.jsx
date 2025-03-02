import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';
import { ReactSVG } from 'react-svg';
import rentalCarLogo from '../../assets/header/rental-car.svg';

import { isCarPage } from '../../utils/isCarPage';

const Navigation = () => {
  const location = useLocation();

  const isCarPageCheck = isCarPage(location.pathname);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.rentalCarLogoContainer}>
          <Link to="/">
            <ReactSVG className={styles.rentalCarLogo} src={rentalCarLogo} />
          </Link>
        </div>

        <div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navListItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    clsx(
                      styles.link,
                      isActive && !isCarPageCheck && styles.active
                    )
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.navListItem}>
                <NavLink
                  to="/catalog"
                  className={({ isActive }) =>
                    clsx(
                      styles.link,
                      isActive && !isCarPageCheck && styles.active
                    )
                  }
                  end
                >
                  Catalog
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
