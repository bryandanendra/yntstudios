import React, { lazy, Suspense } from 'react';
import './App.css';

// Lazy load all pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortoPage = lazy(() => import('./pages/PortoPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

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
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <AboutPage />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <PortoPage />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <ServicesPage />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <ReviewsPage />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <ContactPage />
      </Suspense>
    </div>
  );
}

export default App;
