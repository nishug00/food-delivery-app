import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import orderImage from '../../assets/orderImage.png'
import avatar from '../../assets/avatar.png'
import girlPizza from '../../assets/girlPizza.png';
import girlNoodles from '../../assets/girlNoodles.png';
import notification from '../../assets/noti1.png'
import foodImages from '../../assets/mainPageImage.png';
import appAd from '../../assets/appAd.png';
import orderFood from '../../assets/orderFood.png';
import AppOrder from '../../assets/appOrder.png';
import food from '../../assets/food.png';
import { fetchImagesfromBackend } from '../../Services/image.service';
import Footer from '../Common/Footer/footer';
import rider from '../../assets/ride.png';
import partner from '../../assets/partner.png';
import Banner from '../Common/PromoHeader/promoHeader';
import Restaurants from '../Common/Restaurants/restaurants';
import badges from '../../assets/app-store-badges.png';
import NavBar from '../Common/NavBar/navBar';
function home() {
  const [foodItems, setFoodItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchFoodImages = async () => {
      try {
        const imageData = await fetchImagesfromBackend();
        setFoodItems(imageData.data);  // Assuming imageData has a "data" field with the list of items
      } catch (error) {
        console.error('Error while fetching images:', error);
      }
    };
    fetchFoodImages();
  }, []);

  return (
    <>
      <div className={styles.PageContainer}>
        <Banner />
        <NavBar showBrowseMenu={true} currentPage="home"/>

        <div className={styles.container}>
          <div className={styles.Adwrapper}>
            <div className={styles.leftSide}>
              <div className={styles.title}>Order Restaurant food, takeaway and groceries.</div>
              <div className={styles.subtitle}>Feast Your Senses,<br /> <span>Fast and Fresh</span></div>
              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>Enter a postcode to see what we deliver</div>
                <div className={styles.inputButtonContainer}>
                  <input type="text" className={styles.input} placeholder="e.g. EC4R 3TE" />
                  <button className={styles.searchButton}>Search</button>
                </div>

              </div>
            </div>
            <div className={styles.rightSide}>
              <img src={girlPizza} alt="Girl with Pizza" className={styles.girlwithPizza} />
              <img src={girlNoodles} alt="Girl with Noodles" className={styles.girlwithNoodles} />
              <div className={styles.background}></div>
              <div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dealsWrapper}>
          <div className={styles.deals}>Up to -40% 🎊 Order.uk exclusive deals</div>
          <div className={styles.foodItems}>
            <div className={styles.vegan}>Vegan</div>
            <div className={styles.sushi}>Sushi</div>
            <div className={styles.pizzafastfood}>Pizza & Fast food</div>
            <div className={styles.others}>others</div>
          </div>
          <div className={styles.foodImages}>
            <div className={styles.imageWrapper}>
              <img src={foodImages} alt="Main Image" className={styles.mainImage} />
              <div className={styles.discountTag}>-40%</div>
              <div className={styles.restaurantsContainer}>
                <div className={styles.restaurants}>Restaurant</div>
                <div className={styles.restaurantTitle}>Chef Burgers London</div>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img src={foodImages} alt="Main Image" className={styles.mainImage} />
              <div className={styles.discountTag}>-20%</div>
              <div className={styles.restaurantsContainer}>
                <div className={styles.restaurants}>Restaurant</div>
                <div className={styles.restaurantTitle}>Grand Ai Cafe London</div>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img src={foodImages} alt="Main Image" className={styles.mainImage} />
              <div className={styles.discountTag}>-17%</div>
              <div className={styles.restaurantsContainer}>
                <div className={styles.restaurants}>Restaurant</div>
                <div className={styles.restaurantTitle}>Butterbrot Caf’e London</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categoryWrapper}>
          <div className={styles.categoryTitle}>Order.uk Popular Categories 🤩</div>
          <div className={styles.foodItems}>
            {foodItems.map((item) => (
              <div key={item._id} className={styles.foodItemBox}>
                <img src={item.imageUrl.url} alt={item.name} className={styles.foodImage} />
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.restaurantCount}>{item.restaurantCount} Restaurants</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.restaurantWrapper}>
          <div className={styles.popularRestaurantTitle}>Popular Restaurants</div>
          <Restaurants />
        </div>
        <div className={styles.appAdWrapper}>
          <div className={styles.appAdContainer}>
            <img src={appAd} alt="App Ad" className={styles.appAdShadow} />
            <img src={appAd} alt="App Ad" className={styles.appAd} />
            <div className={styles.appAdTitle}>
              <img src={orderImage} alt="Order Image" /><span className={styles.orderText}>ing is more </span>
            </div>
            <div className={styles.bannerContainer}>
              <span className={styles.personalizedText}>Personalised</span>  & Instant
            </div>
            <div className={styles.downloadText}>Download the Order.uk app for faster ordering</div>
            <img src={badges} alt="Badges" className={styles.badges} />
          </div>
        </div>

        <div className={styles.perksWrapper}>
          {/* Partner Section */}
          <div className={styles.imageWrapper2}>
            <img src={partner} alt='partner' className={styles.perksImage} />
            <div className={styles.tagline}>Earn more with lower fees</div>
            <div className={styles.perksContainer}>
              <div className={styles.perkssignUp}>Signup as a business</div>
              <div className={styles.perksTitle}>Partner with us</div>
              <button className={styles.perksButton}>Get Started</button>
            </div>
          </div>

          {/* Rider Section */}
          <div className={styles.imageWrapper2}>
            <img src={rider} alt='ride' className={styles.perksImage} />
            <div className={styles.tagline}>Avail exclusive perks</div>
            <div className={styles.perksContainer}>
              <div className={styles.perkssignUp}>Signup as a rider</div>
              <div className={styles.perksTitle}>Ride with us</div>
              <button className={styles.perksButton}>Get Started</button>
            </div>
          </div>
        </div>


        <section className={styles.faqSection}>
          <div className={styles.headerRow}>
            <h1 className={styles.title}>Know more about us!</h1>
            <nav className={styles.nav}>
              <button className={`${styles.navButton} ${styles.active}`}>Frequent Questions</button>
              <button className={styles.navButton}>Who we are?</button>
              <button className={styles.navButton}>Partner Program</button>
              <button className={styles.navButton}>Help & Support</button>
            </nav>
          </div>


          <div className={styles.contentContainer}>
            <div className={styles.questions}>
              <button className={`${styles.question} ${styles.activeQuestion}`}>
                How does Order.UK work?
              </button>
              <p className={styles.question}>What payment methods are accepted?</p>
              <p className={styles.question}>Can I track my order in real-time?</p>
              <p className={styles.question}>
                Are there any special discounts or <br />promotions available?
              </p>
              <p className={styles.question}>Is Order.UK available in my area?</p>
            </div>
            <div className={styles.steps}>
              <div className={styles.step}>
                <h3>Place an Order!</h3>
                <img src={orderFood} alt="Place an Order" />
                <p>Place order through our website or Mobile app</p>
              </div>
              <div className={styles.step}>
                <h3>Track Progress</h3>
                <img src={food} alt="Track Progress" />
                <p>You can track your order <br />status with delivery time</p>
              </div>


              <div className={styles.step}>
                <h3>Get your Order!</h3>
                <img src={AppOrder} alt="Get your Order" />
                <p>Receive your order at a <br />lighting fast speed!</p>
              </div>

            </div>


          </div>
          <p className={styles.description}>
            Order.UK simplifies the food ordering process. Browse through our
            diverse menu, select your favorite dishes, and proceed to checkout. Your
            delicious meal will be on its way to your doorstep in no time!
          </p>

        </section>
        <div className={styles.achievementsContainer}>
          <div className={styles.achievementsTitle}>546+<br /><span>Registered Riders</span></div>
          <div className={styles.achievementsTitle}>789,900+<br /><span>Orders Delivered</span></div>
          <div className={styles.achievementsTitle}>690+<br /><span>Restaurants Partnered</span></div>
          <div className={styles.achievementsTitle}>17,457+<br /><span>Food items</span></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default home