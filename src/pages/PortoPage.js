import React from 'react';
import '../App.css';
import TiltedCard from '../components/TiltedCard/TiltedCard';

function PortoPage() {
  const portfolioItems = [
    {
      id: 1,
      title: "Kendrick Lamar - GNX",
      image: "/images/portfolio/sample.jpg",
      caption: "Creative Front-end Development"
    },
    {
      id: 2,
      title: "Project 2", 
      image: "/images/portfolio/sample.jpg",
      caption: "Web Design & Development"
    },
    {
      id: 3,
      title: "Project 3",
      image: "/images/portfolio/sample.jpg", 
      caption: "UI/UX Design"
    },
    {
      id: 4,
      title: "Project 4",
      image: "/images/portfolio/sample.jpg",
      caption: "Mobile App Development"
    },
    {
      id: 5,
      title: "Project 5",
      image: "/images/portfolio/sample.jpg",
      caption: "Creative Coding"
    },
    {
      id: 6,
      title: "Project 6",
      image: "/images/portfolio/sample.jpg",
      caption: "Interactive Design"
    }
  ];

  // Deteksi ukuran layar untuk responsive props
  const isMobile = window.innerWidth <= 480;
  // const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;

  return (
    <section className="porto-container">
      <div className="porto-header">
        <div className="porto-title-left">PORTO</div>
        <div className="porto-title-right">PAGE</div>
      </div>
      
      <div className="porto-content">
        <div className="porto-left-section">
          <div className="porto-subtitle">CREATIVE FRONT-END DEVELOPER</div>
        </div>
        
        <div className="porto-right-section">
          <div className="porto-status">
            <span className="status-text">AVAILABLE</span>
            <span className="status-dot"></span>
          </div>
        </div>
      </div>
      
      <div className="porto-grid">
        {portfolioItems.map((item) => (
          <div key={item.id} className="porto-card-wrapper">
            <TiltedCard
              imageSrc={item.image}
              altText={item.title}
              captionText={item.caption}
              containerHeight={isMobile ? "300px" : "400px"}
              containerWidth="100%"
              imageHeight={isMobile ? "250px" : "350px"}
              imageWidth={isMobile ? "200px" : "280px"}
              scaleOnHover={1.2}
              rotateAmplitude={30}
              showMobileWarning={false}
              showTooltip={false}
              overlayContent={
                <div className="porto-card-overlay-title">
                  {item.title}
                </div>
              }
              displayOverlayContent={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PortoPage;