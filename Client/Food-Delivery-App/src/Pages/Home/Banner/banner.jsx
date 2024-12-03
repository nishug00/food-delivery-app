import React from 'react';
import styles from './banner.module.css';
import girlPizza from '../../../assets/girlPizza.png';
import girlNoodles from '../../../assets/girlNoodles.png';
import Notification from '../../../assets/notification.png';
import LeftIcon from '../../../assets/leftIcon.png';

function Banner() {
    return (
        <div className={styles.container}>
            <div className={styles.Adwrapper}>
                <div className={styles.leftSide}>
                    <div className={styles.title}>Order Restaurant food, takeaway and groceries.</div>
                    <div className={styles.subtitle}>Feast Your Senses,<br /> <span>Fast and Fresh</span></div>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputLabel}>Enter a postcode to see what we deliver</div>
                        <div className={styles.inputButtonContainer}>
                            <input type="text" className={styles.inputText} placeholder="e.g. EC4R 3TE" />
                            <button className={styles.searchButton}>Search</button>
                            <img src={LeftIcon} alt="Left Icon" className={styles.leftIcon} />
                        </div>

                    </div>
                </div>
                <div className={styles.rightSide}>
                    <img src={girlPizza} alt="Girl with Pizza" className={styles.girlwithPizza} />
                    <img src={Notification} alt="Notification" className={styles.notification1} />
                    <img src={Notification} alt="Notification" className={styles.notification2} />
                    <img src={Notification} alt="Notification" className={styles.notification3} />
                    <img src={girlNoodles} alt="Girl with Noodles" className={styles.girlwithNoodles} />
                    <div className={styles.background}></div>
                    <div className={styles.textoutline1}>1</div>
                    <div className={styles.textoutline2}>2</div>
                    <div className={styles.textoutline3}>3</div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner