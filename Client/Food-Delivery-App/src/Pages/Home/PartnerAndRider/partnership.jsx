import React from 'react';
import styles from './partnership.module.css';
import partnerImage from '../../../assets/partner.png';
import riderImage from '../../../assets/ride.png';

function Partnership() {
  return (
    <div className={styles.perksWrapper}>
      <div className={styles.imageWrapper2}>
        <img src={partnerImage} alt="Partner" className={styles.perksImage} />
        <div className={styles.tagline}>Earn more with lower fees</div>
        <div className={styles.perksContainer}>
          <div className={styles.perkssignUp}>Signup as a business</div>
          <div className={styles.perksTitle}>Partner with us</div>
          <button className={styles.perksButton}>Get Started</button>
        </div>
      </div>
      <div className={styles.imageWrapper2}>
        <img src={riderImage} alt="Rider" className={styles.perksImage} />
        <div className={styles.tagline}>Avail exclusive perks</div>
        <div className={styles.perksContainer}>
          <div className={styles.perkssignUp}>Signup as a rider</div>
          <div className={styles.perksTitle}>Ride with us</div>
          <button className={styles.perksButton}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Partnership;
