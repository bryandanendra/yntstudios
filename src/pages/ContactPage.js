import React from 'react';
import '../App.css';

function ContactPage() {
  return (
    <section id="contact" className="contact-container">
      <div className="contact-content">
        <div className="contact-left-section">
          <h1 className="contact-heading">Get in touch</h1>
          <div className="contact-email">
            <a href="mailto:yntstudiofx@gmail.com" className="email-link">
              yntstudio@gmail.com
            </a>
          </div>
          <div className="contact-social">
            <p className="social-text">Or find me on Instagram:</p>
            <div className="instagram-link">
              <svg className="instagram-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <a href="https://instagram.com/yntstudio.fx" target="_blank" rel="noopener noreferrer">
                @yntstudio.fx
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
