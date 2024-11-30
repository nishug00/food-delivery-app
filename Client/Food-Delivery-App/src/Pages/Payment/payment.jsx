import React from 'react';
import styles from './payment.module.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Common/Footer/footer';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import Restaurants from '../Common/Restaurants/restaurants';
import NavBar from '../Common/NavBar/navBar';
import { useAppContext } from '../../Context/AppContext';
import Wallet from '../../assets/Wallet.png';

function payment() {
  const navigate = useNavigate();
  const { cart } = useAppContext();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.PromoHeader}><PromoHeader /></div>
        <NavBar />
        <div className={styles.mainContent}>

          {/* Left Side */}
          <div className={styles.leftSide}>
            {/* Header */}
            <div className={styles.iconTextRow}>
              <i className="codicon codicon-arrow-left" aria-hidden="true"></i>
              <div className={styles.pageTitle}>Choose and Pay</div>
            </div>

            {/* Cards List */}
            <div className={styles.cardsList}>
              <div className={styles.wallet}>
                {/* First Column */}
                <div className={styles.walletColumn}>
                  <div className={styles.circle}>
                    <img src={Wallet} alt="Wallet" className={styles.walletImage} />
                  </div>
                </div>

                {/* Second Column */}
                <div className={styles.walletColumn}>
                  <div className={styles.walletIcon}></div>
                  <div className={styles.walletText}>Wallet</div>
                  <div className={styles.walletBalance}>Available Balance: ₹300</div>
                </div>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.cards}>
                <div className={styles.addCard}>
                  <i className="codicon codicon-plus" aria-hidden="true"></i>
                  <span>Add Debit Card</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className={styles.rightSide}>
            <div className={styles.amountPayment}>
              <div className={styles.amount}>
                Amount to be paid
                <b>₹ {cart.reduce((total, item) => total + item.price * item.count, 0) + 10}</b>
              </div>
              <div className={styles.divider}></div>
              <button
                className={styles.proceedButton}
                onClick={() => navigate('/order')}
              >
                Proceed Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
      <Footer />
      </div>
     
    </>

  );

}

export default payment