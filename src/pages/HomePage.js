import React from 'react';
import LightRays from '../components/LightRays/LightRays';
import '../App.css';

function HomePage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('.about-container');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="home-container">
      <LightRays 
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1}
        lightSpread={1}
        rayLength={3.0}
        pulsating={false}
        fadeDistance={1}
        saturation={1}
        followMouse={true}
        mouseInfluence={0.2}
        noiseAmount={0.0}
        distortion={0.0}
        className="background-rays"
      />
      <div className="content">
        <h1 className="title">YNT STUDIO</h1>
        <div className="button-container">
          <button className="button primary-button" onClick={scrollToContact}>Get In Touch</button>
          <button className="button secondary-button" onClick={scrollToAbout}>Get To Know</button>
        </div>
      </div>
    </section>
  );
}

export default HomePage; 