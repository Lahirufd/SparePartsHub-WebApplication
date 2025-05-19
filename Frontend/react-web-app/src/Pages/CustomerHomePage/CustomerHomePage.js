import React from 'react';
import Header from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';
import Slider from 'react-slick'; // Import Slider component
import "slick-carousel/slick/slick.css"; // Slider styles
import "slick-carousel/slick/slick-theme.css";
import styles from './CustomerHomePage.module.css';

const HomePage = () => {
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
        <section className={styles.servicesSection}>
          <h2>Our Services</h2>
          <div className={styles.serviceGrid}>
            <a href="/items">
              <div className={styles.serviceCard}>
                <img src="buy-spare-parts.jpg" alt="Buy Spare Parts" />
                <h3>Buy Spare Parts</h3>
              </div>
            </a>
            <a href="/warranty-items">
              <div className={styles.serviceCard}>
                <img src="claim-warranty.jpg" alt="Claim Warranty" />
                <h3>Claim Warranty</h3>
              </div>
            </a>
            <a href="/cart">
              <div className={styles.serviceCard}>
                <img src="cart.jpg" alt="Cart Items" />
                <h3>Cart Items</h3>
              </div>
            </a>
            <a href="/feedbacks">
              <div className={styles.serviceCard}>
                <img src="feedbacks.jpg" alt="Feedbacks" />
                <h3>Feedbacks</h3>
              </div>
            </a>
            <a href="/complaints">
              <div className={styles.serviceCard}>
                <img src="complaints.jpg" alt="Complaints" />
                <h3>Complaints</h3>
              </div>
            </a>
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
