import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function WebsitePricingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const [openFaq, setOpenFaq] = useState(null);
  const [userCountry, setUserCountry] = useState('ID');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setUserCountry(data.country_code || 'ID');
      })
      .catch(() => {
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
      const usdPrice = price / 15000;
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
      name: "Landing Page",
      type: "Single Page",
      priceMin: 2500000,
      priceMax: 5000000,
      description: "Perfect for personal portfolios, product launches, or simple business presentations. Modern, responsive, and optimized for conversions.",
      features: [
        "✓ 1 Page Design",
        "✓ Responsive Design (Mobile & Desktop)",
        "✓ Contact Form Integration",
        "✓ SEO Optimization",
        "✓ Fast Loading Speed",
        "✓ 2 Revisions"
      ],
      featured: false,
      ctaText: "Get Started"
    },
    {
      id: 2,
      name: "Business Website",
      type: "Multi Page",
      priceMin: 5000000,
      priceMax: 10000000,
      description: "Ideal for small to medium businesses. Includes multiple pages, CMS integration, and advanced features for professional online presence.",
      features: [
        "✓ Up to 7 Pages",
        "✓ CMS Integration (WordPress/Custom)",
        "✓ Advanced SEO",
        "✓ Blog Section",
        "✓ Contact & Forms",
        "✓ Social Media Integration",
        "✓ 3 Revisions",
        "✓ 3 Months Support"
      ],
      featured: true,
      ctaText: "Get Started"
    },
    {
      id: 3,
      name: "E-Commerce",
      type: "Online Store",
      priceMin: 10000000,
      priceMax: 25000000,
      description: "Full-featured online store with payment gateway, inventory management, and customer dashboard. Perfect for selling products online.",
      features: [
        "✓ Unlimited Products",
        "✓ Payment Gateway Integration",
        "✓ Shopping Cart & Checkout",
        "✓ Customer Dashboard",
        "✓ Inventory Management",
        "✓ Order Tracking",
        "✓ Admin Panel",
        "✓ 6 Months Support"
      ],
      featured: false,
      ctaText: "Get Started"
    },
    {
      id: 4,
      name: "Custom Web App",
      type: "Full Stack",
      priceMin: "Custom",
      priceMax: null,
      description: "Complex web applications with custom features, API integrations, and advanced functionality. Tailored to your specific business needs.",
      features: [
        "✓ Custom Features & Functionality",
        "✓ API Development & Integration",
        "✓ Database Design",
        "✓ User Authentication",
        "✓ Admin Dashboard",
        "✓ Scalable Architecture",
        "✓ 1 Year Support",
        "✓ Maintenance Package"
      ],
      featured: false,
      ctaText: "Contact Us"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "What technologies do you use?",
      answer: "We use modern technologies like React, Next.js, Node.js, WordPress, and other cutting-edge frameworks depending on your project needs. All websites are built with responsive design and optimized performance."
    },
    {
      id: 2,
      question: "How long does it take to build a website?",
      answer: "Landing Page: 1-2 weeks, Business Website: 3-4 weeks, E-Commerce: 6-8 weeks, Custom Web App: 8-12 weeks. Timeline may vary based on project complexity and revision rounds."
    },
    {
      id: 3,
      question: "Do you provide hosting and domain?",
      answer: "Yes! We can help you with domain registration and hosting setup. We also offer managed hosting services with monthly maintenance packages."
    },
    {
      id: 4,
      question: "Will my website be mobile-friendly?",
      answer: "Absolutely! All our websites are fully responsive and optimized for mobile, tablet, and desktop devices. We follow mobile-first design principles."
    },
    {
      id: 5,
      question: "Do you provide website maintenance?",
      answer: "Yes, we offer maintenance packages including content updates, security updates, backups, and technical support. Maintenance terms vary by package."
    },
    {
      id: 6,
      question: "Can I update the website content myself?",
      answer: "Yes! We provide CMS (Content Management System) for Business and E-Commerce packages, allowing you to easily update content, images, and blog posts without coding knowledge."
    }
  ];

  useEffect(() => {
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
          <h1 className="pricing-main-title">Website Development</h1>
          <p className="pricing-subtitle">Professional website solutions for your business needs</p>
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
                  <p className="pricing-duration">{tier.type}</p>
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
                    href="https://wa.me/6285190084149?text=Hi,%20I'm%20interested%20in%20your%20Website%20Development%20services" 
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

        {/* Technology Stack */}
        <div className="vfx-pricing-section">
          <h2 className="vfx-pricing-title">Technology Stack</h2>
          <p className="vfx-pricing-subtitle">Modern technologies we use to build your website</p>
          
          <div className="tech-stack-grid">
            <div className="tech-stack-item">
              <h3>Frontend</h3>
              <p>React, Next.js, Vue.js, HTML5, CSS3, TailwindCSS, GSAP</p>
            </div>
            <div className="tech-stack-item">
              <h3>Backend</h3>
              <p>Node.js, Express, PHP, WordPress, Laravel</p>
            </div>
            <div className="tech-stack-item">
              <h3>Database</h3>
              <p>MongoDB, MySQL, PostgreSQL, Firebase</p>
            </div>
            <div className="tech-stack-item">
              <h3>Deployment</h3>
              <p>Vercel, Netlify, AWS, Digital Ocean, cPanel</p>
            </div>
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
          <h3 className="timeline-title">Development Process</h3>
          <p className="timeline-subtitle">Our streamlined workflow from concept to launch</p>
          <div className="timeline-container">
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>1</span>
              </div>
              <div className="timeline-step-content">
                <h4>Discovery & Planning</h4>
                <p>Understand your goals, target audience, and create a detailed project plan</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>2</span>
              </div>
              <div className="timeline-step-content">
                <h4>Design & Prototype</h4>
                <p>Create wireframes, mockups, and interactive prototypes for your approval</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>3</span>
              </div>
              <div className="timeline-step-content">
                <h4>Development</h4>
                <p>Build your website with clean code, responsive design, and best practices</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>4</span>
              </div>
              <div className="timeline-step-content">
                <h4>Testing & QA</h4>
                <p>Rigorous testing across devices, browsers, and performance optimization</p>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-step">
              <div className="timeline-step-number">
                <span>5</span>
              </div>
              <div className="timeline-step-content">
                <h4>Launch & Support</h4>
                <p>Deploy to production and provide ongoing support and maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WebsitePricingPage;
