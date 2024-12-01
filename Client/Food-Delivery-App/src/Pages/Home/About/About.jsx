import React from 'react';
import styles from './About.module.css';
import orderFood from '../../../assets/orderFood.png';
import appOrder from '../../../assets/appOrder.png';
import food from '../../../assets/food.png';

function FaqSection() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.headerRow}>
        <h1 className={styles.faqTitle}>Know more about us!</h1>
        <nav className={styles.navMenu}>
          <button className={`${styles.navButton} ${styles.navButtonActive}`}>Frequent Questions</button>
          <button className={styles.navButton}>Who we are?</button>
          <button className={styles.navButton}>Partner Program</button>
          <button className={styles.navButton}>Help & Support</button>
        </nav>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.questionList}>
          <button className={`${styles.questionItem} ${styles.questionItemActive}`}>
            How does Order.UK work?
          </button>
          <p className={styles.questionItem}>What payment methods are accepted?</p>
          <p className={styles.questionItem}>Can I track my order in real-time?</p>
          <p className={styles.questionItem}>
            Are there any special discounts or <br /> promotions available?
          </p>
          <p className={styles.questionItem}>Is Order.UK available in my area?</p>
        </div>

        <div>
          <div className={styles.stepContainer}>
            <div className={styles.stepItem}>
              <h3 className={styles.stepTitle}>Place an Order!</h3>
              <img src={orderFood} alt="Place an Order" className={styles.stepImage} />
              <p className={styles.stepDescription}>Place order through our website or Mobile app</p>
            </div>
            <div className={styles.stepItem}>
              <h3 className={styles.stepTitle}>Track Progress</h3>
              <img src={food} alt="Track Progress" className={styles.stepImage} />
              <p className={styles.stepDescription}>You can track your order <br /> status with delivery time</p>
            </div>
            <div className={styles.stepItem}>
              <h3 className={styles.stepTitle}>Get your Order!</h3>
              <img src={appOrder} alt="Get your Order" className={styles.stepImage} />
              <p className={styles.stepDescription}>Receive your order at a <br /> lighting fast speed!</p>
            </div>
          </div>

          <p className={styles.faqDescription}>
            Order.UK simplifies the food ordering process. Browse through our diverse menu,<br />
            select your favorite dishes, and proceed to checkout. Your delicious meal will be <br /> on its way to your doorstep in no time!
          </p>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
