import React, { useState, useEffect } from 'react';
import styles from './restaurants.module.css';
import { fetchRestaurantImagesService } from '../../../Services/image.service';
import { useNavigate } from 'react-router-dom';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/product/${id}`); // Add restaurant ID to the URL
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetchRestaurantImagesService();
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className={styles.container}>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant._id}
          className={styles.card}
          onClick={() => handleCardClick(restaurant._id)}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={restaurant.imageUrl.url}
            alt={restaurant.name}
            className={styles.image}
          />
          <p className={styles.name}>{restaurant.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;
