import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import LogoLoop from '../components/LogoLoop/LogoLoop';

function ServicesPage() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceTitle) => {
    if (serviceTitle === "3D Animation") {
      navigate('/pricing/3d-animation');
    } else if (serviceTitle === "Video Editing") {
      navigate('/pricing/video-editing');
    }
  };

  const services = [
    {
      id: 1,
      title: "3D Animation",
      description: "Creating stunning 3D animations that bring your ideas to life.",
      icon: "/images/3D.png"
    },
    {
      id: 2,
      title: "VFX",
      description: "Professional visual effects that enhance your content and create immersive experiences.",
      icon: "/images/vfx.png"
    },
    {
      id: 3,
      title: "Video Editing",
      description: "Expert video editing services to transform raw footage into compelling visual stories.",
      icon: "/images/video.png"
    }
  ];

  const softwareLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
      alt: "Adobe After Effects",
      title: "After Effects",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
      alt: "Adobe Premiere Pro",
      title: "Premiere Pro",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
      alt: "Blender",
      title: "Blender",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg",
      alt: "DaVinci Resolve",
      title: "DaVinci Resolve",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
      alt: "Adobe Photoshop",
      title: "Photoshop",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
      alt: "Adobe Illustrator",
      title: "Illustrator",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
      alt: "Adobe XD",
      title: "Adobe XD",
      height: 40
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      alt: "Figma",
      title: "Figma",
      height: 40
    }
  ];

  return (
    <section id="services" className="services-container">
      <div className="services-header">
        <h1 className="services-title">OUR SERVICES</h1>
        <p className="services-subtitle">What We Do Best</p>
      </div>

      <div className="services-grid">
        {services.map((service) => {
          const hasPrice = service.title === "3D Animation" || service.title === "Video Editing";
          return (
            <div 
              key={service.id} 
              className={`service-card ${hasPrice ? "service-card-clickable" : ""}`}
              onClick={() => handleServiceClick(service.title)}
              style={hasPrice ? { cursor: 'pointer' } : {}}
            >
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              {hasPrice && (
                <div className="service-badge">View Pricing →</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logo Software Editing */}
      <div className="logo-slide-section">
        <h3 className="logo-slide-title">Tools We Master</h3>
        <LogoLoop
          logos={softwareLogos}
          speed={50}
          direction="left"
          logoHeight={60}
          gap={60}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#ffffff"
          scaleOnHover={true}
        />
      </div>
    </section>
  );
}

export default ServicesPage;
