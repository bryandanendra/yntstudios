import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = (link) => {
    console.log('Navigating to:', link);
    
    // Check if it's a hash link (for home page sections)
    if (link.startsWith('#')) {
      // Navigate to home first if not already there
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(link);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        // Already on home, just scroll
        const element = document.querySelector(link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Regular route navigation
      navigate(link);
      window.scrollTo(0, 0);
    }
  };

  const menuItems = [
    {
      label: 'Home',
      link: '/',
      ariaLabel: 'Go to home page',
    },
    {
      label: 'About',
      link: '#about',
      ariaLabel: 'Learn about us',
    },
    {
      label: 'Portfolio',
      link: '#portfolio',
      ariaLabel: 'View our portfolio',
    },
    {
      label: 'Services',
      link: '#services',
      ariaLabel: 'Our services',
    },
    {
      label: 'Contact',
      link: '#contact',
      ariaLabel: 'Contact us',
    },
  ];

  const socialItems = [
    {
      label: 'Instagram',
      link: 'https://instagram.com/yntstudio',
    },
    {
      label: 'WhatsApp',
      link: 'https://wa.me/6285190084149',
    },
    {
      label: 'Email',
      link: 'mailto:contact@yntstudio.com',
    },
  ];

  // Custom handler untuk menu items
  const enhancedMenuItems = menuItems.map(item => ({
    ...item,
    onClick: (e) => {
      e.preventDefault();
      handleMenuItemClick(item.link);
    }
  }));

  return (
    <StaggeredMenu
      position="right"
      colors={['#1a1a1a', '#2d2d2d', '#000000']}
      items={enhancedMenuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      logoUrl="/favicon.ico"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#000000"
      accentColor="#667eea"
      changeMenuColorOnOpen={true}
      isFixed={true}
    />
  );
}

export default Navigation;
