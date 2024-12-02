import React from 'react';
import styles from './timings.module.css';
import delLocation from '../../../assets/delLocation.png';
import contactInfo from '../../../assets/contactInfo.png';
import clock2 from '../../../assets/clock2.png';

const Timings = () => {
    return (
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
                    <p>If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.</p>
                    <p><strong>Phone number:</strong> <span className={styles.contactInfo}>+934443-43</span></p>
                    <p><strong>Website:</strong> <a href="http://mcdonalds.uk/"><span className={styles.contactInfo}>http://mcdonalds.uk/</span></a></p>
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
    );
};

export default Timings;
