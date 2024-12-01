import React , { useEffect } from 'react';
import styles from './home.module.css';
import Footer from '../Common/Footer/footer';
import PromoHeader from '../Common/PromoHeader/promoHeader';
import Restaurants from '../Common/Restaurants/restaurants';
import AppAd from './appPromotion/appAd';
import Banner from '../Home/Banner/banner'
import NavBar from '../Common/NavBar/navBar';
import About from './About/About';
import Promotions from '../Home/Promotions/promotions';
import PopularCategories from './PopularCategories/Categories';
import Partnership from './PartnerAndRider/partnership';
import Achievements from './Achievements/achievements';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className={styles.PageContainer}>
        <PromoHeader />
        <NavBar showBrowseMenu={true} currentPage="home" />
        <Banner />
        <Promotions />
        <PopularCategories />
        <Restaurants />
        <AppAd />
        <Partnership />
        <About />
        <Achievements />
      </div>
      <Footer />
    </>
  )
}

export default Home