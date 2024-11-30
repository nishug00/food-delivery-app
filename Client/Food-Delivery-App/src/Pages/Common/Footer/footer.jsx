import React from 'react';
import styles from './footer.module.css';
import footerImage from '../../../assets/orderImage.png';
import badges from '../../../assets/app-store-badges.png';
import facebook from '../../../assets/facebook.png';
import instagram from '../../../assets/instagram.png';
import tiktok from '../../../assets/tiktok.png';
import snapchat from '../../../assets/snapchat.png';


function Footer() {
    return (
        <>
            <div className={styles.footerContainer}>
                {/* First Column */}
                <div className={styles.column1}>
                    <img src={footerImage} alt="Footer Logo" className={styles.footerImage} />
                    <img src={badges} alt="Badges" className={styles.badges} />
                    <div className={styles.registration}>
                        Company # 490039-445, Registered with <br/>House of companies.
                    </div>
                </div>

                {/* Second Column */}
                <div className={styles.column}>
                    <div className={styles.deals}>Get Exclusive Deals in Your Inbox</div>
                    <div className={styles.subscribeSection}>
                        <input type="email" placeholder="youremail@gmail.com" className={styles.emailInput} />
                        <button className={styles.subscribeButton}>Subscribe</button>
                    </div>

                    <div className={styles.emailPolicy}>we won't spam, read our &nbsp;<span className={styles.underline}>email policy</span></div>
                    <div className={styles.iconWrapper}>
                        <img src={facebook} alt="Facebook" className={styles.icon} />
                        <img src={instagram} alt="Instagram" className={styles.icon} />
                        <img src={tiktok} alt="TikTok" className={styles.icon} />
                        <img src={snapchat} alt="Snapchat" className={styles.icon} />
                    </div>
                </div>

                {/* Third Column */}
                <div className={styles.column2}>
                    <div className={styles.legalTitle}>Legal Pages</div>
                    <ul className={styles.list}>
                        <li>Terms and Conditions</li>
                        <li>Privacy</li>
                        <li>Cookies</li>
                        <li>Modern Slavery Statement</li>
                    </ul>
                </div>

                {/* Fourth Column */}
                <div className={styles.column2}>
                    <div className={styles.linkTitle}>Important Links</div>
                    <ul className={styles.list}>
                        <li>Get Help</li>
                        <li>Add Your Restaurant</li>
                        <li>Sign Up to Deliver</li>
                        <li>Create a Business Account</li>
                    </ul>
                </div>
            </div>

            {/* New Bottom Row Section */}
            <div className={styles.bottomRow}>
                <div className={styles.copyright}>
                    Order.uk Copyright 2024, All Rights Reserved.
                </div>
                <div className={styles.link}>
                    <span>Privacy Policy</span>
                    <span>Terms</span>
                    <span>Pricing</span>
                    <span>Do not sell or share my personal information</span>
                </div>
            </div>
        </>
    );
}

export default Footer;
