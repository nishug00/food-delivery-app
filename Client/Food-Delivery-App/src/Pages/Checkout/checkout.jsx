import React from 'react';
import styles from './checkout.module.css';
import { useAppContext } from '../../Context/AppContext'; // Import the AppContext hook
import Footer from '../Common/Footer/footer';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import Restaurants from '../Common/Restaurants/restaurants';
import NavBar from '../Common/NavBar/navBar';
import { useNavigate } from 'react-router-dom';
function Checkout() {
  const { cart } = useAppContext(); 
  const navigate = useNavigate();

  return (
    <>
  
    <div className={styles.container}>
    <div className={styles.PromoHeader}><PromoHeader /></div>
    <NavBar />
      {/* Main Content: Left and Right Sides */}
      <div className={styles.mainContent}>
        {/* Left Side */}
        <div className={styles.leftSide}>
          <div className={styles.iconTextRow}>
            <i className="codicon codicon-arrow-left"></i>
            <div>Your Order Details</div>
          </div>
          <div className={styles.orderList}>
            {cart.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <div className={styles.orderItemLeft}>
                  <img src={item.imageUrl.url} alt={item.name} className={styles.itemImage} />
                  <div className={styles.orderItemText}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemQuantity}>{item.count}x Item</p>
                  </div>
                </div>
                <p className={styles.itemPrice}>₹ {item.price * item.count}</p>
              </div>
            ))}
            <div className={styles.notes}>
              <div>Notes</div>
              <input placeholder="Add order notes" />
            </div>
          </div>
        </div>
  
        {/* Right Side */}
        <div className={styles.rightSide}>
          <div className={styles.addressCard}>
            <div className={styles.iconCircle}>
              <i className="codicon codicon-location"></i>
            </div>
            <div className={styles.addressText} onClick={() => navigate('/address')}>
              <h4>Delivery Address</h4>
              <p>45, Green Street, Sector 12...</p>
            </div>
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Items</span>
              <span>₹ {cart.reduce((total, item) => total + item.price * item.count, 0)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Sales Tax</span>
              <span>₹ 10</span>
            </div>
          </div>
          <div className={styles.totalAmount}>
              <p>Subtotal ({cart.length} items)</p>
              <b>₹ {cart.reduce((total, item) => total + item.price * item.count, 0) + 10}</b>
            </div>
          <button className={styles.paymentButton} onClick={() => navigate('/payment')}>Choose Payment Method</button>
        </div>
      </div>
  
      {/* Similar Restaurants Section */}
      <div className={styles.restaurantSection}>
        <div className={styles.popularRestaurantTitle}>Similar Restaurants</div>
        <Restaurants />
      </div>
    </div>
    <Footer />
  </>
  
   
  );
}

export default Checkout;
