import React from 'react';
import Header from '../../Components/Supheader/Supheader';
import Footer from '../../Components/Footer/Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './SupplierHomePage.module.css';

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


        {/* Creative Sell Your Spare Parts Section */}
        <section className={styles.sellPartsSection}>
          <div className={styles.sellPartsLeft}>
            <img src="sell-spare-parts.jpg" alt="Sell Spare Parts" className={styles.sellPartsImage} />
          </div>
          <div className={styles.sellPartsRight}>
            <h2>Turn Your Spare Parts Into Cash!</h2>
            <p>
              Got unused or extra auto parts? List them on our marketplace and reach thousands of buyers instantly. Enjoy a simple upload process, secure transactions, and a supportive seller community. <b>Start earning today!</b>
            </p>
            <a href="/sellingitems">
              <button className={styles.sellPartsButton}>Sell Now</button>
            </a>
          </div>
        </section>



        {/* Modern Quick Actions Tiles Section in a container, aligned right, with paragraph */}
        <section className={styles.quickActionsSection}>
          <div className={styles.quickActionsContainer}>
            <div className={styles.quickActionsText}>
              <h2>Quick Actions</h2>
              <p>
                Have something to share or report? Use our quick actions to send your feedback or complaints directly to our team. Your input helps us improve our service and support you better!
              </p>
            </div>
            <div className={styles.tilesRowRight}>
              <a href="/feedbacks" className={styles.tileLink}>
                <div className={styles.actionTile}>
                  <img src="feedbacks.jpg" alt="Feedbacks" />
                  <span>Feedbacks</span>
                </div>
              </a>
              <a href="/complaints" className={styles.tileLink}>
                <div className={styles.actionTile}>
                  <img src="complaints.jpg" alt="Complaints" />
                  <span>Complaints</span>
                </div>
              </a>
            </div>
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
