import React, { useState, useEffect } from 'react';
import styles from './Categories.module.css';
import { fetchImagesfromBackend } from '../../../Services/image.service';

function Categories() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodImages = async () => {
      try {
        const imageData = await fetchImagesfromBackend();
        setFoodItems(imageData.data);
      } catch (error) {
        console.error('Error while fetching images:', error);
      }
    };
    fetchFoodImages();
  }, []);

  return (
    <div className={styles.categoriesWrapper}>
      <div className={styles.categoriesTitle}>Order.uk Popular Categories 🤩</div>
      <div className={styles.foodItemsContainer}>
        {foodItems.map((item) => (
          <div key={item._id} className={styles.foodItem}>
            <img src={item.imageUrl.url} alt={item.name} className={styles.foodImage} />
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.restaurantCount}>{item.restaurantCount} Restaurants</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
