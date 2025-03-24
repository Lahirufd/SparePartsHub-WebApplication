import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Slider from 'react-slick'; // Import Slider component
import "slick-carousel/slick/slick.css"; // Slider styles
import "slick-carousel/slick/slick-theme.css";
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.headerImage}>
          <Slider {...settings}>
            <div className={styles.slideContainer}>
              <img src="image1.jpg" alt="Slide 1" className={styles.slideImage} />
            </div>
            <div className={styles.slideContainer}>
              <img src="image2.jpg" alt="Slide 2" className={styles.slideImage} />
            </div>
            <div className={styles.slideContainer}>
              <img src="image3.jpg" alt="Slide 3" className={styles.slideImage} />
            </div>
            <div className={styles.slideContainer}>
              <img src="image4.jpg" alt="Slide 4" className={styles.slideImage} />
            </div>
          </Slider>
        </div>
        
        <section className={styles.welcomeSection}>
          <h1>Welcome to Thelee Group Pvt. Ltd</h1>
          <p>OUR ULTIMATE ASPIRATION IS ABOUT YOUR SAFETY</p>
          <p>
            Thelee Group Pvt. Ltd., established on January 17th, 2021, by Mr. Uvindu Amarasinghe, is a premier spare parts warehouse located in Ratmalana. Specializing in both high-quality used and brand new imported spare parts, Thelee Group caters to a wide range of European and Japanese vehicles. The company's commitment to authenticity, quality, and customer satisfaction sets it apart from other warehouses in the area. Mr. Uvindu's vision goes beyond merely distributing spare parts. It extends to providing exceptional customer service, making Thelee Group a trusted name in the industry.
          </p>
        </section>

        {/* Products Section */}
        <section className={styles.productsSection}>
          <h2>Our Products</h2>
          <div className={styles.productContent}>
            <div className={styles.productTile}>
              <a href="/products">
                <div className={styles.serviceCard}>
                  <img src="products.jpg" alt="Our Products" className={styles.productImage} />
                </div>
              </a>
            </div>
            <div className={styles.productDetails}>
              <p className={styles.productDescription}>
                Discover a comprehensive selection of high-quality spare parts for European and Japanese vehicles. Our range includes both used and brand new products, carefully selected to ensure reliability and durability. Explore our catalog to find parts tailored to your needs.
              </p>
              <a href="/products" className={styles.clickHereButton}>
                Click Here
              </a>
            </div>
          </div>
        </section>

        {/* Login/Signup Section */}
        <section className={styles.loginSection}>
          <h2>Join Us Today!</h2>
          <p>
            Whether you're looking to purchase high-quality spare parts as a customer or
            interested in supplying parts to our warehouse, we invite you to join our community. 
            Sign up today to access exclusive offers and services tailored to meet your needs.
          </p>
          <div className={styles.buttonContainer}>
            <button onClick={() => navigate('/signup')} className={`${styles.btn} ${styles.btnOutline}`}>
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className={`${styles.btn} ${styles.btnPrimary}`}>
              Login
            </button>
          </div>
        </section>


        <section className={styles.brandsSection}>
          <h2>Supported Brands</h2>
          <div className={styles.brandLogos}>
            <img src="mazda-logo.png" alt="Mazda" />
            <img src="nissan-logo.png" alt="Nissan" />
            <img src="toyota-logo.png" alt="Toyota" />
            <img src="suzuki-logo.png" alt="Suzuki" />
            <img src="honda-logo.png" alt="Honda" />
            <img src="mitsubishi-logo.png" alt="Mitsubishi" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
