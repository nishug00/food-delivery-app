import React, { useState, useEffect } from 'react';
import styles from './Product.module.css';
import orderImage from '../../assets/orderImage.png';
import avatar from '../../assets/avatar.png';
import snack from '../../assets/snack3.png';
import minOrder from '../../assets/minOrder.png';
import delivery from '../../assets/delivery.png';
import clock from '../../assets/clock.png';
import rating from '../../assets/ratings.png';
import search from '../../assets/search.png';
import DiscountImage1 from '../../assets/DiscountImage1.png';
import DiscountImage2 from '../../assets/discountImage2.png';
import DiscountImage3 from '../../assets/discountImage3.png';
import addItem from '../../assets/addItem.png';
import { fetchBurgerMenuFromService, fetchFriesMenuFromService, fetchDrinksMenuFromService } from '../../Services/image.service';
import Footer from '../Common/Footer/footer';
import delLocation from '../../assets/delLocation.png';
import clock2 from '../../assets/clock2.png';
import contactInfo from '../../assets/contactInfo.png';
import Restaurants from '../Common/Restaurants/restaurants';
import { fetchReviewsFromService } from '../../Services/reviews.service';
import { useAppContext } from '../../Context/AppContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locationPin from '../../assets/locationPin.png';
import NavBar from '../Common/NavBar/navBar';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import { useLocation } from 'react-router-dom';
import MenuItems from './Menu/MenuItems';
import Reviews from './CustomerReviews/Reviews';
function Product() {

    const { cart } = useAppContext();
    const [isCartActive, setIsCartActive] = useState(false);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.count), 0);
    const discount = 3;
    const deliveryFee = 3;
    const totalToPay = subtotal - discount + deliveryFee;
    const position = [51.505, -0.09];
    const { showCart } = useAppContext();
    const location = useLocation();

    useEffect(() => {
        console.log('Attempting to scroll to top');
        document.documentElement.scrollTop = 0; // For most modern browsers
        document.body.scrollTop = 0;            // For older browsers
    }, [location.pathname]);
    // Trigger when route changes
    const toggleCartVisibility = () => setCartVisible((prev) => !prev);

    const [isCartVisible, setCartVisible] = useState(false);
    return (
        <>
            <div className={styles.pageContainer}>
                <PromoHeader isCartVisible={isCartVisible} toggleCartVisibility={toggleCartVisibility} />
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
            <div className={styles.menuContainer1}>
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
                    <div> Orbit®</div>
                </div>
            </div>
            <MenuItems isCartVisible={isCartVisible} />
        
            <div className={styles.pageContainer}>           

                <div className={styles.infoWrapper}>
                    <div className={styles.infoContainer}>
                        <div className={styles.column}>
                            <div className={styles.deliveryInfoHeader}>
                                <img src={delLocation} alt="Delivery Location" />
                                <h3>Delivery Information</h3>
                            </div>
                            <p>
                                <strong>Monday:</strong> 12:00 AM-3:00 AM, 8:00 AM-3:00 AM<br />
                                <strong>Tuesday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Wednesday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Thursday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Friday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Saturday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Sunday:</strong> 8:00 AM-12:00 AM
                            </p>
                            <p><strong>Estimated time until delivery:</strong> 20 min</p>
                        </div>


                        <div className={styles.column}>
                            <div className={styles.deliveryInfoHeader}>
                                <img src={contactInfo} alt="Contact Information" />
                                <h3>Contact Information</h3>
                            </div>
                            <p>If you have allergies or other dietary <br />restrictions, please contact the restaurant. The <br />restaurant will provide food-specific <br />information upon request.</p>
                            <p><strong>Phone number:</strong> <br /><span className={styles.contactInfo}>+934443-43</span></p>
                            <p><strong>Website:</strong> <br /><div href="http://mcdonalds.uk/"><span className={styles.contactInfo}>http://mcdonalds.uk/</span></div></p>
                        </div>

                        <div className={styles.column1}>
                            <div className={styles.deliveryInfoHeader}>
                                <img src={clock2} alt="Operational Times" />
                                <h2>Operational Times</h2>
                            </div>
                            <p>
                                <strong>Monday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Tuesday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Wednesday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Thursday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Friday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Saturday:</strong> 8:00 AM-3:00 AM<br />
                                <strong>Sunday:</strong> 8:00 AM-3:00 AM
                            </p>
                        </div>

                    </div>


                </div>
                <div className={styles.locationWrapper}>
                    {/* Map Container */}
                    <MapContainer
                        center={position}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                            <Popup>A pretty popup. <br /> Easily customizable.</Popup>
                        </Marker>
                    </MapContainer>

                    {/* Static Overlay */}
                    <div className={styles.overlayContainer}>
                        <div className={styles.rectangleContainer}>
                            <div className={styles.rectangleText}>McDonald’s <br />South London</div>
                            <div className={styles.circleContainer}>
                                <img src={locationPin} alt="Icon" className={styles.circleImage} />
                            </div>
                        </div>
                    </div>
                </div>
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
