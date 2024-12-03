import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import Footer from '../Common/Footer/footer';
import NavBar from '../Common/NavBar/navBar';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import MenuItems from './Menu/MenuItems';
import Reviews from './CustomerReviews/Reviews';
import Restaurants from '../Common/Restaurants/restaurants';
import snack from '../../assets/snack3.png';
import minOrder from '../../assets/minOrder.png';
import delivery from '../../assets/delivery.png';
import clock from '../../assets/clock.png';
import rating from '../../assets/ratings.png';
import search from '../../assets/search.png'
import styles from './product.module.css';
import Timings from './timingInfo/timings';
import Location from './Location/location';

function Product() {
    const { cart } = useAppContext();
    const [isCartVisible, setCartVisible] = useState(false);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.count), 0);
    const discount = 3;
    const deliveryFee = 3;
    const totalToPay = subtotal - discount + deliveryFee;

    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.pathname]);

    const toggleCartVisibility = () => setCartVisible(prev => !prev);

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.PromoHeader}>
                <PromoHeader isCartVisible={isCartVisible} toggleCartVisibility={toggleCartVisibility} />
                </div>
             
                <NavBar currentPage="products" />

                <div className={styles.snackSection}>
                    <img src={snack} alt="Background Snack" className={styles.snackBackground} />
                    <div className={styles.snackDetails}>
                        <p className={styles.tagline}>I'm lovin' it!</p>
                        <div className={styles.location}>McDonald’s East London</div>
                        <div className={styles.detailContainer}>
                            <div className={styles.detailItem}>
                                <img src={minOrder} alt="Minimum Order" /> Minimum Order: 12 GBP
                            </div>
                            <div className={styles.detailItem}>
                                <img src={delivery} alt="Delivery" /> Delivery in 20-25 Minutes
                            </div>
                        </div>
                    </div>
                    <div className={styles.snackImageSection}>
                        <img src={rating} alt="Rating" className={styles.ratingIcon} />
                        <img src={snack} alt="Snack" className={styles.snackMain} />
                    </div>
                </div>

                <div className={styles.openTimings}>
                    <img src={clock} alt="Clock" />
                    <p>Open until 3:00 AM</p>
                </div>

                <div className={styles.offersSection}>
                    <h2>All Offers from McDonald’s East London</h2>
                    <div className={styles.searchBox}>
                        <img src={search} alt="Search Icon" />
                        <span>Search from menu...</span>
                    </div>
                </div>
            </div>

            <div className={styles.menuContainer}>
                <div className={styles.menuItems}>
                    <div className={styles.offerText}>Offers</div>
                    <div>Burgers</div>
                    <div>Fries</div>
                    <div>Snacks</div>
                    <div>Salads</div>
                    <div>Cold drinks</div>
                    <div>Happy Meal®</div>
                    <div>Desserts</div>
                    <div>Hot drinks</div>
                    <div>Sauces</div>
                    <div>Orbit®</div>
                </div>
            </div>

            <MenuItems isCartVisible={isCartVisible} />

            <div className={styles.pageContainer}>
                <div className={styles.timings}><Timings /></div>
                <Location />
            </div>

            <Reviews />

            <div className={styles.similarRestaurants}>
                <h2>Similar Restaurants</h2>
                <div className={styles.restaurantList}>
                    <Restaurants />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Product;
