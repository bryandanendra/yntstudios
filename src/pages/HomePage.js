import React, { useState, useEffect } from 'react';
import Prism from '../components/Prism/Prism';
import '../App.css';

function HomePage() {
  const [shouldRenderPrism, setShouldRenderPrism] = useState(false);
  
  // Delay Prism rendering to improve initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderPrism(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
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
      {shouldRenderPrism && (
        <Prism 
          height={1}
          baseWidth={5.5}
          animationType="hover"
          glow={1}
          noise={0}
          transparent={true}
          scale={2}
          hueShift={0}
          colorFrequency={1}
          hoverStrength={2}
          inertia={0.05}
          bloom={1}
          suspendWhenOffscreen={true}
          timeScale={0.5}
        />
      )}
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