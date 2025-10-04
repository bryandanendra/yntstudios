import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortoPage from'./pages/PortoPage';
import ServicesPage from './pages/ServicesPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <div className="App">
      <HomePage />
      <AboutPage />
      <PortoPage />
      <ServicesPage />
      <ReviewsPage />
      <ContactPage />
    </div>
  );
}

export default App;
