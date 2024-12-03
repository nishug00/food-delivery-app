import React from 'react';
import styles from './promotions.module.css';
import foodImage from '../../../assets/mainPageImage.png';

function Promotions() {
  return (
    <div className={styles.dealsWrapper}>
      <div className={styles.deals}>Up to -40% 🎊 Order.uk exclusive deals</div>
      <div className={styles.dealsforMobile}>Up to -40% Discount Offers🎊 </div>
      <div className={styles.foodCategories}>
        <div className={styles.vegan}>Vegan</div>
        <div className={styles.sushi}>Sushi</div>
        <div className={styles.pizzaFastFood}>Pizza & Fast food</div>
        <div className={styles.others}>Others</div>
      </div>
      <div className={styles.foodItems}>
        <div className={styles.imageWrapper}>
          <img src={foodImage} alt="Main Image" className={styles.mainImage} />
          <div className={styles.discountTag}>-40%</div>
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurant}>Restaurant</div>
            <div className={styles.restaurantTitle}>Chef Burgers London</div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={foodImage} alt="Main Image" className={styles.mainImage} />
          <div className={styles.discountTag}>-20%</div>
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurant}>Restaurant</div>
            <div className={styles.restaurantTitle}>Grand Ai Cafe London</div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={foodImage} alt="Main Image" className={styles.mainImage} />
          <div className={styles.discountTag}>-17%</div>
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurant}>Restaurant</div>
            <div className={styles.restaurantTitle}>Butterbrot Café London</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotions;
