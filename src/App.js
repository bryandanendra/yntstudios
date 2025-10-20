import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';

// Lazy load all pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortoPage = lazy(() => import('./pages/PortoPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const VideoEditingPricingPage = lazy(() => import('./pages/VideoEditingPricingPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Main landing page with all sections
const LandingPage = () => (
  <>
    <HomePage />
    <AboutPage />
    <PortoPage />
    <ServicesPage />
    <ReviewsPage />
    <ContactPage />
  </>
);

// Loading component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1.5rem'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing/3d-animation" element={<PricingPage />} />
            <Route path="/pricing/video-editing" element={<VideoEditingPricingPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
