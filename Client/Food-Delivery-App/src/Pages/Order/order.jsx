import React from 'react';
import styles from './order.module.css';
import CheckCircle from '../../assets/CheckCircle.png';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import NavBar from '../Common/NavBar/navBar';
import { useAppContext } from '../../Context/AppContext';
import Footer from '../Common/Footer/footer';
import { useNavigate } from 'react-router-dom';

function Order() {
    const { cart } = useAppContext();
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.promoHeader}>
                    <PromoHeader />
                </div>
                <NavBar />
                <div className={styles.orderContainer}>
                    <div className={styles.orderStatus}>
                        <div className={styles.iconWrapper}>
                            <img
                                src={CheckCircle}
                                alt="Order successfully placed"
                                className={styles.successIcon}
                            />
                        </div>
                        <div className={styles.statusText}>
                            <div className={styles.orderConfirmationTitle}>
                                Order Placed Successfully
                            </div>
                            <div className={styles.orderConfirmationMessage}>
                                Your order is confirmed and on its way. Get set to
                                <br />
                                savor your chosen delights!
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderItemsList}>
                        <div className={styles.orderItemsWrapper}>
                            {cart && cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div key={index} className={styles.orderItem}>
                                        {item.name}
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noItemsMessage}>
                                    No items in the order
                                </div>
                            )}
                        </div>
                        <button className={styles.backButton} onClick={() => navigate('/home')}>Back to Home</button>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>  <Footer /></div>
          
        </>
    );
}

export default Order;
