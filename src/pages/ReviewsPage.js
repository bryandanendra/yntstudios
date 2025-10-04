import React from 'react';
import '../App.css';

function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc.",
      avatar: "https://i.pravatar.cc/150?img=1",
      quote: "YNT Studio transformed our brand with stunning 3D animations. Their attention to detail and creativity exceeded our expectations. Highly recommended!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Creative Director",
      company: "Digital Agency",
      avatar: "https://i.pravatar.cc/150?img=13",
      quote: "Working with YNT Studio was a game-changer. Their VFX work brought our vision to life in ways we never imagined possible.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Producer",
      company: "Media House",
      avatar: "https://i.pravatar.cc/150?img=5",
      quote: "Professional, creative, and always on time. YNT Studio's video editing skills are top-notch. They understand exactly what we need.",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      role: "CEO",
      company: "StartUp Ventures",
      avatar: "https://i.pravatar.cc/150?img=12",
      quote: "The quality of work from YNT Studio is exceptional. They delivered beyond what we asked for and the results speak for themselves.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Brand Manager",
      company: "Fashion Brand",
      avatar: "https://i.pravatar.cc/150?img=9",
      quote: "Incredible talent and professionalism. YNT Studio created visuals that perfectly captured our brand essence. Absolutely brilliant!",
      rating: 5
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Film Producer",
      company: "Indie Films",
      avatar: "https://i.pravatar.cc/150?img=14",
      quote: "YNT Studio's expertise in VFX and animation is unmatched. They brought cinematic quality to our project within budget and timeline.",
      rating: 5
    }
  ];

  const renderReviewCard = (review) => (
    <div key={review.id} className="review-card">
      <p className="review-text">{review.quote}</p>
      
      <div className="review-footer">
        <div className="review-avatar">
          <img src={review.avatar} alt={review.name} />
        </div>
        <div className="review-info">
          <h4 className="review-name">{review.name}</h4>
          <p className="review-role">{review.role}</p>
          <p className="review-company">{review.company}</p>
        </div>
      </div>

      <div className="review-rating">
        {[...Array(review.rating)].map((_, index) => (
          <span key={index} className="star">★</span>
        ))}
      </div>
    </div>
  );

  return (
    <section className="reviews-container">
      <div className="reviews-header">
        <h1 className="reviews-title">CLIENT REVIEWS</h1>
        <p className="reviews-subtitle">What Our Clients Say About Us</p>
      </div>

      {/* Desktop Grid */}
      <div className="reviews-grid">
        {reviews.map((review) => renderReviewCard(review))}
      </div>

      {/* Mobile Carousel */}
      <div className="reviews-carousel">
        <div className="reviews-carousel-track">
          {/* Duplicate reviews for infinite loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div key={`${review.id}-${index}`} className="review-card">
              <p className="review-text">{review.quote}</p>
              
              <div className="review-footer">
                <div className="review-avatar">
                  <img src={review.avatar} alt={review.name} />
                </div>
                <div className="review-info">
                  <h4 className="review-name">{review.name}</h4>
                  <p className="review-role">{review.role}</p>
                  <p className="review-company">{review.company}</p>
                </div>
              </div>

              <div className="review-rating">
                {[...Array(review.rating)].map((_, starIndex) => (
                  <span key={starIndex} className="star">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsPage;
