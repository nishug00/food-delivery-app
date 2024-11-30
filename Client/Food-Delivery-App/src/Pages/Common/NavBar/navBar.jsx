import React from 'react';
import styles from './navBar.module.css';
import orderImage from '../../../assets/orderImage.png';
import avatar from '../../../assets/avatar.png';
import { useAppContext } from '../../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import Options from '../../../assets/options.png';

function navBar({ showBrowseMenu, currentPage }) {
    const { user } = useAppContext(); // User from context
    const username = user?.name || localStorage.getItem('username');
    const navigate = useNavigate();
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
                <div className={styles.specialOffers}>Special Offers</div>
                <div className={styles.restaurant}>Restaurants</div>
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
