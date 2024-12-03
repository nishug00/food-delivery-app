import React, { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import { useAppContext } from '../../Context/AppContext';
import Footer from '../Common/Footer/footer';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import Restaurants from '../Common/Restaurants/restaurants';
import NavBar from '../Common/NavBar/navBar';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserAddresses } from '../../Services/address.service';

function Checkout() {
  const { cart } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartData, setCartData] = useState(cart);
  const [orderNotes, setOrderNotes] = useState('');
  const [addresses, setAddresses] = useState([]);
  const token = localStorage.getItem('token');
  const [defaultAddress, setDefaultAddress] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedCartData = params.get('cartData');
    const isSharedSession = params.get('isSharedSession');

    if (encodedCartData) {
      const decodedCartData = JSON.parse(decodeURIComponent(encodedCartData));
      setCartData(decodedCartData);
      if (isSharedSession) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('country');
        localStorage.removeItem('gender');
        localStorage.removeItem('email');
      }
    }
  }, []);


  const handlePaymentClick = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      navigate('/payment');
    }
  };

  useEffect(() => {
    if (token) {
      const loadAddresses = async () => {
        try {
          const data = await fetchUserAddresses(token);
          setAddresses(data);
          const defaultAddr = data.find(address => address.isDefault);
          setDefaultAddress(defaultAddr);
        } catch {
          toast.error('Failed to fetch addresses');
        }
      };
      loadAddresses();
    }
  }, [token]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.PromoHeader}><PromoHeader /></div>
        <NavBar />
        <div className={styles.mainContent}>
          {/* Left Side */}
          <div className={styles.leftSide}>
            <div className={styles.iconTextRow}>
              <i
                className="codicon codicon-arrow-left"
                onClick={() => navigate(-1)}
                style={{ cursor: 'pointer' }}
              ></i>
              <div>Your Order Details</div>
              <div>Checkout</div>
            </div>
            <div className={styles.orderList}>
              {cartData.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <div className={styles.orderItemLeft}>
                    <img
                      src={item.imageUrl?.url || 'default-image-url.jpg'}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.orderItemText}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemQuantity}>{item.count}x Item</p>
                    </div>
                  </div>
                  <p className={styles.itemPrice}>₹ {item.price * item.count}</p>
                </div>
              ))}

              <div className={styles.orderNotesHeader}>Notes</div>
              <input
                type="text"
                value={orderNotes}
                className={styles.orderNotes}
                placeholder="Add order notes"
              />
            </div>
          </div>


          {/* Right Side */}
          <div className={styles.rightSide}>
            <div className={styles.addressCardHeader}>Delivery Address</div>
            <div className={styles.addressCard}>
              <div className={styles.iconCircle}>
                <i className="codicon codicon-location"></i>
              </div>
              <div className={styles.addressContainer}>
                {defaultAddress ? (
                  <div key={defaultAddress._id} className={styles.addressText} onClick={() => navigate('/address')}>
                    <h4>Delivery Address</h4>
                    
                      <p>{defaultAddress.fullAddress},{defaultAddress.city}, {defaultAddress.state}</p>
                    
                  </div>
                ) : (
                  <p>No default address found.</p>
                )}
              </div>


            </div>
            <div className={styles.summaryHeader}>Order Summary</div>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Items</span>
                <span>₹ {cartData.reduce((total, item) => total + item.price * item.count, 0)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Sales Tax</span>
                <span>₹ 10</span>
              </div>
            </div>
            <div className={styles.totalAmount}>
              <p>Subtotal ({cartData.length} items)</p>
              <b>₹ {cartData.reduce((total, item) => total + item.price * item.count, 0) + 10}</b>
            </div>
            <button className={styles.paymentButton} onClick={handlePaymentClick}>Choose Payment Method</button>
          </div>
        </div>

        {/* Similar Restaurants Section */}
        <div className={styles.restaurantSection}>
          <div className={styles.popularRestaurantTitle}>Similar Restaurants</div>
          <Restaurants />
        </div>
      </div>
      <div className={styles.footer}> <Footer /></div>
    </>


  );
}

export default Checkout;
