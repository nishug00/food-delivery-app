import React, { useState, useEffect } from 'react';
import styles from './MenuItems.module.css';
import DiscountImage1 from '../../../assets/discountImage1.png';
import DiscountImage2 from '../../../assets/discountImage2.png';
import DiscountImage3 from '../../../assets/discountImage3.png';
import addItem from '../../../assets/addItem.png';
import { useAppContext } from '../../../Context/AppContext';
import { fetchBurgerMenuFromService, fetchFriesMenuFromService, fetchDrinksMenuFromService } from '../../../Services/image.service';
import PromoHeader from '../../Common/PromoHeader/promoHeader';
import Cart from '../../../assets/cart.png';
import Motor from '../../../assets/motor.png';
import Store from '../../../assets/home.png';
import { useNavigate } from 'react-router-dom';
function MenuItems({ isCartVisible, toggleCartVisibility }) {
    const { showCart } = useAppContext();
    const [burgerMenu, setBurgerMenu] = useState([]);
    const [friesMenu, setFriesMenu] = useState([]);
    const [drinksMenu, setDrinksMenu] = useState([]);
    const {  handleAddItem, handleRemoveItem } = useAppContext();
    const navigate = useNavigate();
    // const gridLayout = isCartVisible ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
    const { cart, setCart } = useAppContext();  // Get cart and setCart from AppContext
    const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);
  
    useEffect(() => {
        const fetchBurgerMenu = async () => {
            try {
                const imageData = await fetchBurgerMenuFromService();
                setBurgerMenu(imageData.data);
            } catch (error) {
                console.error('Error while fetching images:', error);
            }
        };
        fetchBurgerMenu();
    }, []);

    useEffect(() => {
        const fetchFriesMenu = async () => {
            try {
                const imageData = await fetchFriesMenuFromService();
                setFriesMenu(imageData.data);
            } catch (error) {
                console.error('Error while fetching images:', error);
            }
        };
        fetchFriesMenu();
    }, []);

    useEffect(() => {
        const fetchDrinksMenu = async () => {
            try {
                const imageData = await fetchDrinksMenuFromService();
                setDrinksMenu(imageData.data);
            } catch (error) {
                console.error('Error while fetching images:', error);
            }
        };
        fetchDrinksMenu();
    }, []);
    const removeItem = (index) => {
        const updatedCart = [...cart];
        const item = updatedCart[index];
    
        if (item.count > 1) {
          item.count -= 1;
        } else {
          updatedCart.splice(index, 1);
        }
    
        setCart(updatedCart);
      };

    return (

        <>
            <div className={`${styles.discountContainer} ${isCartVisible ? styles.cartVisibleGrid : ""}`}>

                <div className={styles.discountSection}>
                    <img src={DiscountImage1} alt="Discount Image" className={styles.discountImage} />
                    <div className={styles.discountTag}>-20%</div>
                    <div className={styles.restaurantsContainer}>
                        <div className={styles.restaurants}>McDonald’s East London</div>
                        <div className={styles.restaurantTitle}>First Order Discount</div>
                        <div className={styles.addItem}>
                            <button><img src={addItem} alt="Add Item" /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.discountSection}>
                    <img src={DiscountImage2} alt="Discount Image" className={styles.discountImage} />
                    <div className={styles.discountTag}>-20%</div>
                    <div className={styles.restaurantsContainer}>
                        <div className={styles.restaurants}>McDonald’s East London</div>
                        <div className={styles.restaurantTitle}>Vegan Discount</div>
                        <div className={styles.addItem}>
                            <button><img src={addItem} alt="Add Item" /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.discountSection}>
                    <img src={DiscountImage3} alt="Discount Image" className={styles.discountImage} />
                    <div className={styles.discountTag}>-100%</div>
                    <div className={styles.restaurantsContainer}>
                        <div className={styles.restaurants}>McDonald’s East London</div>
                        <div className={styles.restaurantTitle}>Free Ice Cream Offer</div>
                        <div className={styles.addItem}>
                            <button><img src={addItem} alt="Add Item" /></button>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div
                className={styles.menuItems}
                style={{
                    gridTemplateColumns: isCartVisible ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', 
                }}
            ></div> */}
            <div className={styles.heading}>Burger</div>
            <div className={`${styles.burgerWrapper} ${isCartVisible ? styles.cartVisibleGrid : ""}`}>
            {burgerMenu.map((burger, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.burgerName}>{burger.name}</h3>
                                <p className={styles.description}>{burger.description}</p>
                                <div className={styles.footer}>
                                    <span className={styles.price}>₹ {burger.price}</span>
                                    <div className={styles.addItem}>
                                        <button onClick={() => handleAddItem(burger)}>
                                            <img src={addItem} alt="Add Item" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <img src={burger.imageUrl.url} alt={burger.name} className={styles.image} />
                        </div>
                    ))}
            </div>



            <div className={styles.friesheading}>Fries</div>
            <div className={`${styles.burgerWrapper} ${isCartVisible ? styles.cartVisibleGrid : ""}`}>
                {friesMenu.map((fries, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.FriesName}>{fries.name}</h3>
                            <p className={styles.description}>{fries.description}</p>
                            <div className={styles.footer}>
                                <span className={styles.price}>₹ {fries.price}</span>
                                <div className={styles.addItem}>
                                    <button onClick={() => handleAddItem(fries)}>
                                        <img src={addItem} alt="Add Item" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img src={fries.imageUrl.url} alt={fries.name} className={styles.image} />
                    </div>
                ))}
            </div>


            <div className={styles.drinksheading}>Cold Drinks</div>
            <div className={`${styles.burgerWrapper} ${isCartVisible ? styles.cartVisibleGrid : ""}`}>
                {drinksMenu.map((drinks, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.DrinksName}>{drinks.name}</h3>
                            <p className={styles.description}>{drinks.description}</p>
                            <div className={styles.footer}>
                                <span className={styles.price}>₹ {drinks.price}</span>
                                <div className={styles.addItem}>
                                    <button onClick={() => handleAddItem(drinks)}>
                                        <img src={addItem} alt="Add Item" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img src={drinks.imageUrl.url} alt={drinks.name} className={styles.image} />
                    </div>
                ))}
            </div>


            {isCartVisible && (
                <div className={styles.cartDetailsModal}>
                    <div className={styles.modalHeader}>
                        <span><img src={Cart} alt="Cart Icon" className={styles.cartIcon} /></span>My Basket
                    </div>

                    <div className={styles.itemsWrapper}>
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className={styles.cartItem}>
                                    <div className={styles.itemCountCircle}>
                                        {item.count}x
                                    </div>
                                    <div className={styles.priceTitleWrapper}>
                                        <span className={styles.price}>₹ {item.price}</span>
                                        <span className={styles.itemName}>{item.name}</span>
                                    </div>
                                    <span
                                        className={styles.removeItem}
                                        onClick={() => removeItem(index)}
                                    >

                                        <i className={`codicon codicon-trash ${styles.trashIcon}`}></i>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={styles.priceDetails}>
                        <div className={styles.subtotal}>
                            <span>Subtotal:</span>
                            <span>₹ {totalPrice}</span>
                        </div>
                        <div className={styles.discount}>
                            <span>Discounts:</span>
                            <span>-₹ 3.00</span>
                        </div>
                        <div className={styles.deliveryFee}>
                            <span>Delivery fee:</span>
                            <span>₹ 3.00</span>
                        </div>
                    </div>

                    <div className={styles.priceWrapper}>
                        <div className={styles.totalPrice}>
                            <span>Total to pay</span>
                            <span>₹ {totalPrice}.00</span>
                        </div>

                        <div className={styles.chooseFreeItem}>
                            <span>Choose your free item..</span>
                            <span className={`codicon codicon-arrow-small-down`}></span>
                        </div>

                        <div className={styles.applyCoupon}>
                            <span>Apply Coupon Code here</span>
                            <span className={`codicon codicon-arrow-small-down`}></span>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.leftColumn}>
                            <img src={Motor} alt="Delivery Image" className={styles.image} />
                            <div className={styles.type}>Delivery</div>
                            <div className={styles.time}>Starts at 17:50</div>
                        </div>
                        <div className={styles.rightColumn}>
                            <img src={Store} alt="Collection Image" className={styles.image} />
                            <div className={styles.type}>Collection</div>
                            <div className={styles.time}>Starts at 16:50</div>
                        </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.checkoutButton} onClick={() => navigate("/checkout")}>Checkout!</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuItems;
