import React from 'react';
import styles from './Achievements.module.css';

function Achievements() {
  return (
    <div className={styles.achievementsWrapper}>
      <div className={styles.achievementItem}>
        <div className={styles.achievementValue}>546+</div>
        <div className={styles.achievementLabel}>Registered Riders</div>
      </div>
      <div className={styles.achievementItem}>
        <div className={styles.achievementValue}>789,900+</div>
        <div className={styles.achievementLabel}>Orders Delivered</div>
      </div>
      <div className={styles.achievementItem}>
        <div className={styles.achievementValue}>690+</div>
        <div className={styles.achievementLabel}>Restaurants Partnered</div>
      </div>
      <div className={styles.achievementItem}>
        <div className={styles.achievementValue}>17,457+</div>
        <div className={styles.achievementLabel}>Food Items</div>
      </div>
    </div>
  );
}

export default Achievements;
