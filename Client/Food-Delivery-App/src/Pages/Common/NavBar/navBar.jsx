import React from 'react';
import styles from './navBar.module.css';
import orderImage from '../../../assets/orderImage.png';
import avatar from '../../../assets/avatar.png';
import { useAppContext } from '../../../Context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Options from '../../../assets/options.png';

function navBar({ currentPage }) {
    const { user } = useAppContext();
    const username = user?.name || localStorage.getItem('username');
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/' || location.pathname === '/home';

    return (
        <div className={styles.navContainer}>
            <div className={styles.imageContainer}>
                <img src={orderImage} alt="Order" className={styles.orderImage} />
                <img src={Options} alt="Options" className={styles.Options} />
            </div>

            <div className={styles.navItemsWrapper}>
                <button
                    className={`${styles.homeButton} ${currentPage === 'home' ? styles.homeActive : styles.homeInactive
                        }`}
                >
                    Home
                </button>
                {isHomePage && (
                    <div className={styles.browseMenu}>Browse Menu</div>
                )}
                <div className={styles.specialOffers}>Special Offers</div>
                {/* <div className={styles.restaurant}>Restaurants</div> */}
                <button
                    className={`${styles.restaurant} ${currentPage === 'products' ? styles.restaurantActive : styles.restaurantInactive
                        }`}
                >
                    Restaurants
                </button>
                <div className={styles.trackOrder}>Track Order</div>
            </div>

            <div className={styles.user} onClick={() => navigate('/profile')}>
                <span className={styles.avatar}>
                    <img src={avatar} alt="User Avatar" />
                </span>
                Hi {username || "User"}
            </div>
        </div>
    );
}

export default navBar;
