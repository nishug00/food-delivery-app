import React from 'react';
import styles from './appAd.module.css';
import appAdShadow from '../../../assets/appAd.png';
import appAdImage from '../../../assets/appAd.png';
import orderImage from '../../../assets/orderImage.png';
import badges from '../../../assets/app-store-badges.png';

function AppAd() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={appAdShadow} alt="Shadow" className={styles.shadow} />
        <img src={appAdImage} alt="App Ad" className={styles.image} />
        <div className={styles.title}>
            <img src={orderImage} alt="Order" className={styles.orderImage} />
          <span className={styles.text}>ing is more</span>
        </div>
        <div className={styles.banner}>
          <span className={styles.highlight}>Personalised</span> & Instant
        </div>
        <div className={styles.download}>
          Download the Order.uk app for faster ordering
        </div>
        <img src={badges} alt="App Store Badges" className={styles.badge} />
      </div>
    </div>
  );
}

export default AppAd;
