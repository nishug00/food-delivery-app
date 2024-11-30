import React, { useState, useEffect } from 'react';
import styles from './promoHeader.module.css';
import star from '../../../assets/star.png';          // Adjust the path accordingly
import location from '../../../assets/location.png';
import Cart from '../../../assets/cart.png';
import arrow from '../../../assets/arrow.png';
import orderImage from '../../../assets/orderImage.png';
import { useAppContext } from '../../../Context/AppContext'; // Assuming this is your context
import Product from '../../Product/product';
import Delete from '../../../assets/delete.png';
import Motor from '../../../assets/motor.png';
import Store from '../../../assets/home.png';
import { useNavigate } from 'react-router-dom';
function PromoHeader() {
  const { cart, setCart } = useAppContext();  // Get cart and setCart from AppContext
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState(cart); // Initialize local cartItems with context cart

  const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);
  const navigate = useNavigate();
  const handleShowCart = () => {
    setIsCartVisible(!isCartVisible); // Toggle the cart modal visibility
  };

  useEffect(() => {
    setCartItems(cart); // Sync the local cartItems state whenever the global cart changes
  }, [cart]);

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
    <div className={styles.promoBanner}>
      <div className={styles.promoSection}>
        <img src={star} alt="Star Icon" className={styles.starIcon} />
        <div className={styles.promoText}>
          Get 5% Off your first order,&nbsp;<span>Promo: ORDER5</span>
        </div>
      </div>

      <div className={styles.locationSection}>
        <img src={location} alt="Location Icon" className={styles.locationIcon} />
        <div className={styles.addressText}>Regent Street, A4, A4201, London</div>
        <div className={styles.changeLocation}>Change Location</div>

        <div className={styles.cartSection} onClick={handleShowCart}>
          <div className={styles.cartDetails}>
            <img src={Cart} alt="Cart Icon" className={styles.cartIcon} />
            <div className={styles.cartLabel}>My Cart</div>
          </div>
          <div className={styles.currency}>
            <div className={styles.currencyText}></div>
          </div>
          <div className={styles.cartArrow}>
            <img src={arrow} alt="Arrow Icon" className={styles.arrowIcon} />
          </div>
        </div>

        {/* Cart Details Section */}
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
              <button className={styles.checkoutButton} onClick={()=>navigate("/checkout")}>Checkout!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromoHeader;
