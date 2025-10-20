import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function VideoEditingPricingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const [openFaq, setOpenFaq] = useState(null);
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
      name: "Short Form",
      duration: "1-3 Minutes",
      priceMin: 150000,
      priceMax: 350000,
      description: "Perfect for social media content, short promotional videos, or quick highlights. Includes basic editing, transitions, and color correction.",
      features: [
        "✓ 1-3 minutes duration",
        "✓ Basic color correction",
        "✓ Smooth transitions",
        "✓ Background music & sound effects"
      ],
      featured: false,
      ctaText: "Get Started"
    },
    {
      id: 2,
      name: "Medium Form",
      duration: "4-7 Minutes",
      priceMin: 350000,
      priceMax: 650000,
      description: "Ideal for YouTube videos, corporate presentations, or detailed product showcases. Includes advanced editing, motion graphics, and professional color grading.",
      features: [
        "✓ 4-7 minutes duration",
        "✓ Advanced color grading",
        "✓ Motion graphics & animations",
        "✓ Professional audio mixing"
      ],
      featured: true,
      ctaText: "Get Started"
    },
    {
      id: 3,
      name: "Long Form",
      duration: "8+ Minutes",
      priceMin: "Custom",
      priceMax: null,
      description: "For documentaries, long-form content, or complex projects requiring extensive editing. Fully customized workflow with premium effects and detailed post-production.",
      features: [
        "✓ 8+ minutes duration",
        "✓ Cinematic color grading",
        "✓ Advanced VFX & compositing",
        "✓ Full post-production suite"
      ],
      featured: false,
      ctaText: "Contact Us"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "What video formats do you accept?",
      answer: "We accept all major video formats including MP4, MOV, and raw footage from cameras. If you have a specific format, feel free to contact us and we'll accommodate it."
    },
    {
      id: 2,
      question: "How long does the editing process take?",
      answer: "Short Form (1-3 min): 3-5 days, Medium Form (4-7 min): 5-8 days, Long Form (8+ min): 10-15 days. Rush delivery available with additional cost."
    },
    {
      id: 3,
      question: "Do you provide revisions?",
      answer: "Yes! We include 2-3 revision rounds in all packages to ensure the final video meets your expectations. Additional revisions can be arranged if needed."
    },
    {
      id: 4,
      question: "Can you add subtitles and captions?",
      answer: "Absolutely! We can add subtitles, captions, and text overlays in multiple languages. This service is included in all packages."
    },
    {
      id: 5,
      question: "What about music and sound effects?",
      answer: "We provide royalty-free background music and sound effects. If you have specific tracks you'd like to use, you can provide them, or we can source licensed music for an additional fee."
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
          <h1 className="pricing-main-title">Video Editing</h1>
          <p className="pricing-subtitle">Professional video editing services for all your content needs</p>
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
                  <p className="pricing-duration">{tier.duration}</p>
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
                    href="https://wa.me/6285190084149?text=Hi,%20I'm%20interested%20in%20your%20Video%20Editing%20services" 
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
          <p className="timeline-subtitle">Our streamlined editing workflow from start to finish</p>
          <div className="timeline-container">
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>1</span>
              </div>
              <div className="timeline-step-content">
                <h4>Briefing & Upload</h4>
                <p>Discuss your vision, requirements, and upload raw footage securely to our platform</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>2</span>
              </div>
              <div className="timeline-step-content">
                <h4>Rough Cut</h4>
                <p>We create an initial edit with basic cuts, transitions, and structure for your review</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>3</span>
              </div>
              <div className="timeline-step-content">
                <h4>Fine Tuning</h4>
                <p>Color grading, audio mixing, effects, and refinements based on your feedback</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>4</span>
              </div>
              <div className="timeline-step-content">
                <h4>Final Delivery</h4>
                <p>Export in your preferred format and resolution, ready for publishing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoEditingPricingPage;
