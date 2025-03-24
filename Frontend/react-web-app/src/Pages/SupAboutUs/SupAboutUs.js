import React from 'react';
import Header from '../../Components/Supheader/Supheader';
import Footer from '../../Components/Footer/Footer';
import styles from './SupAboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutUsWrapper}>
      <Header />
      <div className={styles.aboutUsContainer}>
        <h1>About Us</h1>
        <div className={styles.introSection}>
          <img src="office.png" alt="Thelee Group Office" className={styles.introImage} />
          <p>
            Thelee Group Pvt. Ltd. is a spare parts warehouse located in Ratmalana. It was established on January 17th, 2021, by the visionary owner, Mr. Uvindu Amarasinghe.
          </p>
        </div>
        <div className={styles.missionSection}>
          <p>
            Thelee Group is a company where you can get high-quality used and brand-new imported spare parts. At Thelee Group, spare parts purchasing has been taken to a new level and is set apart from other warehouses in the area. A large number of spare parts for various models of European and Japanese vehicles can be found at this company.
          </p>
          <img src="parts.jpg" alt="Spare Parts" className={styles.missionImage} />
        </div>
        <div className={styles.visionSection}>
          <img src="team.jpg" alt="Thelee Group Team" className={styles.visionImage} />
          <p>
            What really makes this company stand out is its unwavering commitment to authenticity, quality, and customer satisfaction. Mr. Uvindu’s intention behind the opening of Thelee Group is not only to distribute high-quality spare parts, but also to provide high-quality customer service.
          </p>
        </div>

        <div className={styles.contactForm}>
          <h2>Add Your Feedbacks Here</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="complain">Comment</label>
              <textarea id="complain" name="complain" required></textarea>
            </div>
            <button type="submit2">Send Feedback</button>
          </form>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
