import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function PricingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const [openFaq, setOpenFaq] = useState(null);
  const [openAnimCard, setOpenAnimCard] = useState(null);
  const [userCountry, setUserCountry] = useState('ID'); // Default to Indonesia

  useEffect(() => {
    // Detect user location using IP geolocation
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setUserCountry(data.country_code || 'ID');
      })
      .catch(() => {
        // Fallback to timezone detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes('Jakarta') || timezone.includes('Asia')) {
          setUserCountry('ID');
        }
      });
  }, []);

  const formatPrice = (price) => {
    const isIndonesia = userCountry === 'ID';
    
    if (isIndonesia) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    } else {
      const usdPrice = price / 15000; // Approximate conversion rate
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(usdPrice);
    }
  };

  const pricingTiers = [
    {
      id: 1,
      name: "Low Poly",
      priceMin: 80000,
      priceMax: 250000,
      description: "Minimal polygon model, ideal for mobile games, AR/VR, or real-time applications. Features minimal detail and is very lightweight in terms of performance.",
      features: [
        "✓ Minimal polygon count",
        "✓ Optimized for mobile & AR/VR",
        "✓ Fast rendering performance",
        "✓ Basic texturing"
      ],
      featured: false,
      ctaText: "Get Started"
    },
    {
      id: 2,
      name: "Medium Poly",
      priceMin: 250000,
      priceMax: 500000,
      description: "Medium detail model, suitable for PC games, animations, or product visualization. Features more polygons with better textures and details, while maintaining a balance between performance and quality.",
      features: [
        "✓ Balanced polygon count",
        "✓ Perfect for PC games & animations",
        "✓ Enhanced texturing & details",
        "✓ Product visualization ready"
      ],
      featured: true,
      ctaText: "Get Started"
    },
    {
      id: 3,
      name: "High Poly",
      priceMin: "Custom",
      priceMax: null,
      description: "High detail model with maximum polygons, perfect for cinematic rendering, films, or premium product visualization. Best quality with extremely smooth and realistic details.",
      features: [
        "✓ Maximum polygon count",
        "✓ Cinematic quality rendering",
        "✓ Ultra-detailed texturing",
        "✓ Film & premium visualization"
      ],
      featured: false,
      ctaText: "Contact Us"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How long does it take to complete?",
      answer: "Completion time varies depending on model complexity. Low Poly: 3-5 days, Medium Poly: 5-10 days, High Poly: 10-20 days. For urgent projects, we provide fast track service with additional cost."
    },
    {
      id: 2,
      question: "Are revisions included?",
      answer: "Yes, we provide 2-3 free revision rounds to ensure the result meets your expectations. Additional revisions may incur charges as agreed."
    },
    {
      id: 3,
      question: "What file formats are provided?",
      answer: "We provide various formats such as GLB, FBX, OBJ, and other formats according to your project needs. Source files can also be provided with additional cost."
    },
    {
      id: 4,
      question: "What are the payment methods?",
      answer: "Payment can be made via bank transfer or e-wallet. For large projects, we accept a 50% down payment upfront and full payment after project completion."
    }
  ];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging.current) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isMobile || !isDragging.current) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < pricingTiers.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
    
    isDragging.current = false;
  };

  return (
    <section id="pricing-section" className="pricing-container">
      <div className="pricing-content">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {/* Header */}
        <div className="pricing-header">
          <h1 className="pricing-main-title">3D Project</h1>
          <p className="pricing-subtitle">Professional 3D modeling services tailored to your needs</p>
        </div>

        {/* Pricing Cards Carousel */}
        <div className="pricing-carousel-container">
          <div 
            className="pricing-cards"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: isMobile ? `translateX(-${currentSlide * 100}%)` : 'none'
            }}
          >
            {pricingTiers.map((tier) => (
              <div 
                key={tier.id} 
                className={`pricing-card ${tier.featured ? 'pricing-card-featured' : ''}`}
              >
                <div className="pricing-card-header">
                  <h2 className="pricing-tier-name">{tier.name}</h2>
                  <div className="pricing-amount">
                    {tier.priceMax ? (
                      <>
                        <span className="price">{formatPrice(tier.priceMin)}</span>
                        <span className="price-separator">–</span>
                        <span className="price">{formatPrice(tier.priceMax)}</span>
                      </>
                    ) : (
                      <span className="price price-custom">{tier.priceMin}</span>
                    )}
                  </div>
                </div>
                <div className="pricing-card-body">
                  <p className="pricing-description">{tier.description}</p>
                  <ul className="pricing-features">
                    {tier.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <a 
                    href="https://wa.me/6285190084149?text=Hi,%20I'm%20interested%20in%20your%203D%20Animation%20services" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pricing-cta-button"
                  >
                    {tier.ctaText}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators for Mobile */}
          {isMobile && (
            <div className="carousel-indicators">
              {pricingTiers.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3D Animation Pricing Section */}
        <div className="animation-pricing-section">
          <h2 className="animation-pricing-title">3D Animation Pricing</h2>
          <p className="animation-pricing-subtitle">Professional 3D animation services priced per second</p>
          
          <div className="animation-pricing-cards">
            {/* Basic Animation Card */}
            <div className="animation-card-accordion">
              <button
                className={`animation-card-header ${openAnimCard === 'basic' ? 'active' : ''}`}
                onClick={() => isMobile && setOpenAnimCard(openAnimCard === 'basic' ? null : 'basic')}
              >
                <div className="animation-header-content">
                  <h3 className="animation-tier">Basic Animation</h3>
                  <div className="animation-price">
                    <span className="price-amount">{formatPrice(45000)}</span>
                    <span className="price-unit">/ second</span>
                  </div>
                </div>
                {isMobile && <span className="animation-icon">{openAnimCard === 'basic' ? '−' : '+'}</span>}
              </button>
              <div className={`animation-card-body ${!isMobile || openAnimCard === 'basic' ? 'open' : ''}`}>
                <p className="animation-description">
                  Simple animations with basic movements, suitable for product showcases and simple character animations.
                </p>
                <ul className="animation-features">
                  <li>✓ Simple object movements</li>
                  <li>✓ Basic camera work</li>
                  <li>✓ Standard lighting</li>
                  <li>✓ Simple materials</li>
                </ul>
                <div className="animation-video-preview">
                  <video 
                    className="preview-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="https://res.cloudinary.com/ds4ota3jr/video/upload/v1759743031/Compres_negeri_awan_e1kjv3.mp4" type="video/mp4" />
                  </video>
                  <p className="video-label">Example: Basic Animation (45k/sec)</p>
                </div>
              </div>
            </div>

            {/* Premium Animation Card */}
            <div className="animation-card-accordion animation-card-premium">
              <button
                className={`animation-card-header ${openAnimCard === 'premium' ? 'active' : ''}`}
                onClick={() => isMobile && setOpenAnimCard(openAnimCard === 'premium' ? null : 'premium')}
              >
                <div className="animation-header-content">
                  <h3 className="animation-tier">Premium Animation</h3>
                  <div className="animation-price">
                    <span className="price-amount">{formatPrice(85000)}</span>
                    <span className="price-unit">/ second</span>
                  </div>
                </div>
                {isMobile && <span className="animation-icon">{openAnimCard === 'premium' ? '−' : '+'}</span>}
              </button>
              <div className={`animation-card-body ${!isMobile || openAnimCard === 'premium' ? 'open' : ''}`}>
                <p className="animation-description">
                  Complex animations with advanced techniques, perfect for high-end commercials and detailed character work.
                </p>
                <ul className="animation-features">
                  <li>✓ Complex character rigging</li>
                  <li>✓ Advanced camera movements</li>
                  <li>✓ Professional lighting setup</li>
                  <li>✓ Realistic materials & textures</li>
                  <li>✓ Particle effects & simulations</li>
                </ul>
                <div className="animation-video-preview">
                  <video 
                    className="preview-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="https://res.cloudinary.com/ds4ota3jr/video/upload/v1759745707/VFX_Air_Terjun_compres_katb2z.mp4" type="video/mp4" />
                  </video>
                  <p className="video-label">Example: Premium Animation (85k/sec)</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="animation-note">
            <p>💡 <strong>Note:</strong> Final pricing depends on project complexity, duration, and specific requirements. Contact us for a detailed quote!</p>
          </div> */}
        </div>

        {/* Showcase Video Section */}
        <div className="pricing-showcase">
          <h2 className="showcase-title">See our work in action</h2>
          <div className="showcase-video-wrapper">
            <video 
              className="showcase-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://res.cloudinary.com/ds4ota3jr/video/upload/v1759743031/Compres_negeri_awan_e1kjv3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Second Video */}
          <div className="showcase-video-wrapper showcase-video-second">
            <video 
              className="showcase-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://res.cloudinary.com/ds4ota3jr/video/upload/v1759745707/VFX_Air_Terjun_compres_katb2z.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pricing-faq">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${openFaq === faq.id ? 'active' : ''}`}
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === faq.id ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaq === faq.id ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Timeline */}
        <div className="pricing-timeline">
          <h3 className="timeline-title">Project Timeline</h3>
          <p className="timeline-subtitle">Our streamlined process from concept to delivery</p>
          <div className="timeline-container">
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>1</span>
              </div>
              <div className="timeline-step-content">
                <h4>Briefing</h4>
                <p>Initial consultation to understand your vision, requirements, and project goals</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>2</span>
              </div>
              <div className="timeline-step-content">
                <h4>Concept Development</h4>
                <p>Creating sketches, mood boards, and initial concepts for your approval</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>3</span>
              </div>
              <div className="timeline-step-content">
                <h4>Production</h4>
                <p>3D modeling, texturing, rigging, and animation based on approved concept</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>4</span>
              </div>
              <div className="timeline-step-content">
                <h4>Delivery</h4>
                <p>Final review, revisions, and delivery of all files to client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPage;
