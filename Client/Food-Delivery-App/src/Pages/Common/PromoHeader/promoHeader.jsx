import React, { useState, useEffect } from 'react';
import styles from './PromoHeader.module.css';
import starIcon from '../../../assets/star.png';
import locationIcon from '../../../assets/location.png';
import cartIcon from '../../../assets/cart.png';
import arrowIcon from '../../../assets/arrow.png';
import { useAppContext } from '../../../Context/AppContext';
import motorIcon from '../../../assets/motor.png';
import storeIcon from '../../../assets/home.png';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserAddresses } from '../../../Services/address.service';
import { toast } from 'react-hot-toast';


function PromoHeader({ isCartVisible, toggleCartVisibility }) {
  const { cart, setCart } = useAppContext();
  const { user } = useAppContext();
  const [cartItems, setCartItems] = useState(cart);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');



  const navigate = useNavigate();


  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    if (user && user.token) {
      const fetchAddresses = async () => {
        try {
          const data = await fetchUserAddresses(user.token);
          setAddresses(data);
          console.log('Addresses:', data);
        } catch (err) {
          setError('Failed to fetch addresses');
          toast.error('Failed to fetch addresses');
        } finally {
          setLoading(false);
        }
      };
      fetchAddresses();
    }
  }, [user]);
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
  const defaultAddress = addresses.find(address => address.isDefault);
  return (
    <div className={styles.promoBanner}>
      <div className={styles.promoSection}>
        <img src={starIcon} alt="Star Icon" className={styles.starIcon} />
        <div className={styles.promoText}>
          Get 5% Off your first order,&nbsp;<span>Promo: ORDER5</span>
        </div>
      </div>

      <div className={styles.locationSection}>
        <div className={styles.locationContainer}>
          <img src={locationIcon} alt="Location Icon" className={styles.locationIcon} />

         
            <>
              {defaultAddress ? (
                <div className={styles.addressText}>
                  <p>{defaultAddress.fullAddress}</p>
                  <p>{defaultAddress.city}, {defaultAddress.state}</p>
                  <Link to="/address" className={styles.navLocation}>
                    Change Location
                  </Link>
                </div>
              ) : (
                <p>No default address found.</p>
              )}
              {!defaultAddress && (
                <Link to="/address" className={styles.navLocation}>
                  Add Location
                </Link>
              )}
            </>
 
        </div>

        <div className={styles.cartSection} onClick={toggleCartVisibility}>
          <div className={styles.cartDetails}>
            <img src={cartIcon} alt="Cart Icon" className={styles.cartIcon} />
            <div className={styles.cartLabel}>My Cart</div>
          </div>
          <div className={styles.cartArrow}>
            <img src={arrowIcon} alt="Arrow Icon" className={styles.arrowIcon} />
          </div>
        </div>

        {/* {isCartVisible && (
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
        )} */}
      </div>
    </div>
  );
}

export default PromoHeader;
