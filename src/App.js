import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortoPage from'./pages/PortoPage';
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <div className="App">
      <HomePage />
      <AboutPage />
      <PortoPage />
      <ContactPage />
    </div>
  );
}

export default App;
