import React, { useState, useEffect } from 'react';
import '../App.css';
import ModelViewer from '../components/ModelViewer/ModelViewer';


function AboutPage() {
  const [canvasSize, setCanvasSize] = useState({ width: 900, height: 900 });
  const [zoomSettings, setZoomSettings] = useState({ min: 0.5, max: 0.8 });
  const [rotationSpeed, setRotationSpeed] = useState(0.4);
  const [modelOffset, setModelOffset] = useState({ x: 0.5, y: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Make canvas fully responsive - use full viewport dimensions
      const width = viewportWidth;
      const height = viewportHeight;
      
      // Set zoom distance based on device dimensions
      let minZoom, maxZoom, autoSpeed, offsetX, offsetY;
      
      if (viewportWidth <= 480) {
        // Small mobile devices
        minZoom = 0.6;  // Zoom lebih jauh agar tidak keluar frame
        maxZoom = 1.2;  // Bisa zoom out lebih jauh
        autoSpeed = 0.4; // Lebih cepat untuk mobile
        offsetX = 0.2;   // Geser ke kanan (lebih sedikit)
        offsetY = 0;     // Tengah vertikal
      } else if (viewportWidth <= 768) {
        // Mobile devices
        minZoom = 0.55;  // Zoom lebih jauh agar tidak keluar frame
        maxZoom = 1.0;   // Sedang jauh
        autoSpeed = 0.4; // Sedang cepat
        offsetX = 0.3;   // Geser ke kanan
        offsetY = 0;     // Tengah vertikal
      } else if (viewportWidth <= 1024) {
        // Tablet devices
        minZoom = 0.4;  // Agak dekat
        maxZoom = 1.0;  // Agak jauh
        autoSpeed = 0.4; // Normal
        offsetX = 0.45;  // Geser ke kanan
        offsetY = 0;     // Tengah
      } else {
        // Desktop devices
        minZoom = 0.5;  // Default dekat
        maxZoom = 0.8;  // Default jauh
        autoSpeed = 0.3; // Lebih lambat untuk desktop
        offsetX = 0.5;   // Geser ke kanan
        offsetY = 0;     // Tengah
      }
      
      setCanvasSize({ width, height });
      setZoomSettings({ min: minZoom, max: maxZoom });
      setRotationSpeed(autoSpeed);
      setModelOffset({ x: offsetX, y: offsetY });
    };

    // Set initial size
    updateCanvasSize();
    
    // Update size on window resize
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <section className="about-container">
      <div className="canvas-wrapper">
        <ModelViewer
          url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
          width={canvasSize.width}
          height={canvasSize.height}
          modelXOffset={modelOffset.x}  // Geser ke kanan (nilai positif)
          modelYOffset={modelOffset.y}    // Geser ke atas/bawah (0 = tengah)
          defaultRotationX={-30}
          defaultRotationY={45}
          autoRotate={true}
          autoRotateSpeed={rotationSpeed}
          enableMouseParallax={true}
          enableHoverRotation={true}
          enableManualZoom={true}
          minZoomDistance={zoomSettings.min}  // Zoom in maximum (semakin kecil = semakin dekat)
          maxZoomDistance={zoomSettings.max}    // Zoom out maximum (semakin besar = semakin jauh)
          ambientIntensity={0.4}
          keyLightIntensity={1.2}
          fillLightIntensity={0.6}
          rimLightIntensity={1.0}
          environmentPreset="studio"
        />
        
        {/* Text Overlay */}
        <div className="text-overlay">
          <div className="text-content">
            <h1 className="overlay-title">ABOUT US</h1>
            <p className="overlay-text">Experience the thrill of speed with our cutting-edge 3D models. Every detail crafted with precision, every curve designed for performance.</p>
            {/* <div className="overlay-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>High Performance</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Precision Design</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>Next Generation</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage; 