import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function PortoPage() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef(null);
  
  // Lazy load video when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const section = document.querySelector('.porto-container');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, [shouldLoadVideo]);

  return (
    <section className="porto-container">
      <div className="porto-header">
        <div className="porto-title-left">PORTO</div>
        <div className="porto-title-right">PAGE</div>
      </div>
      
      <div className="porto-content">
        <div className="porto-left-section">
          <div className="porto-subtitle">YNT STUDIO</div>
        </div>
        
        <div className="porto-right-section">
          <div className="porto-status">
            <span className="status-text">SHOWREEL</span>
            <span className="status-dot"></span>
          </div>
        </div>
      </div>
      
      {/* Video Showreel */}
      <div className="showreel-container">
        {shouldLoadVideo ? (
          <video 
            ref={videoRef}
            className="showreel-video"
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
          >
            <source 
              src="https://cdn.sanity.io/files/2hv88549/production/0d33834548eb1bbe7aae74f2e749b7d2b9d6d45d.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className="showreel-video" 
            style={{
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            Loading video...
          </div>
        )}
      </div>
      
    </section>
  );
}

export default PortoPage;