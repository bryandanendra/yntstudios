import React from 'react';
import '../App.css';

function ContactPage() {
  return (
    <section id="contact" className="contact-container">
      <div className="contact-content">
        <div className="contact-left-section">
          <h1 className="contact-heading">Get in touch</h1>
          <div className="contact-email">
            <a href="mailto:yntstudio@gmail.com" className="email-link">
              yntstudio@gmail.com
            </a>
          </div>
          <div className="contact-social">
            <p className="social-text">Or find me on Instagram:</p>
            <div className="instagram-link">
              <div className="instagram-icon">
                <div className="instagram-circle"></div>
              </div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                @ynt.studio
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-right-section">
          <div className="location-info">
            <p className="location-label">Location</p>
            <div className="location-details">
              <p>Kediri</p>
              <p>East Java</p>
              <p>Indonesia</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-background-name">YNT</div>
    </section>
  );
}

export default ContactPage;
