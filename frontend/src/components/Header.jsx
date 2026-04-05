import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, Instagram, Phone, Mail } from 'lucide-react';
import './Header.css';
import slogo from '../assets/Slogo.png';
import slogob from '../assets/Slogob.png';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-contact">
            <a href="mailto:f.a@semali.az"><Mail size={14}/> f.a@semali.az</a>
            <a href="tel:+994502164771"><Phone size={14}/> +994 50 216 47 71</a>
          </div>
          <div className="social-icons">
            <a href="#"><Twitter size={14}/></a>
            <a href="#"><Facebook size={14}/></a>
            <a href="#"><Linkedin size={14}/></a>
            <a href="#"><Instagram size={14}/></a>
          </div>
        </div>
      </div>
      
      <div className="main-header">
        <div className="container main-header-inner">
          <div className="logo">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={scrolled ? slogob : slogo} alt="Semalı Fire Logo" className="header-logo" style={{ maxHeight: '60px', width: 'auto' }} />
            </Link>
          </div>
          
          <nav className="desktop-nav">
            <ul>
              <li><Link to="/" className={location.pathname === '/' && !location.hash ? 'active' : ''}>Ana Səhifə</Link></li>
              <li><Link to="/haqqimizda" className={location.pathname === '/haqqimizda' ? 'active' : ''}>Haqqımızda</Link></li>
              <li><Link to="/#services" className={location.hash === '#services' ? 'active' : ''}>Xidmətlər</Link></li>
              <li><Link to="/#projects" className={location.hash === '#projects' ? 'active' : ''}>Layihələr</Link></li>
              <li><Link to="/#contact" className={location.hash === '#contact' ? 'active' : ''}>Əlaqə</Link></li>
            </ul>
          </nav>

          <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
          <X size={32} />
        </button>
        <div className="sidebar-logo">
          <Link to="/" onClick={() => { setIsSidebarOpen(false); window.scrollTo(0, 0); }}>
            <img src={slogob} alt="Semalı Fire Logo" className="header-logo" style={{ maxHeight: '50px', width: 'auto' }} />
          </Link>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/" onClick={() => setIsSidebarOpen(false)}>Ana Səhifə</Link></li>
            <li><Link to="/haqqimizda" onClick={() => setIsSidebarOpen(false)}>Haqqımızda</Link></li>
            <li><Link to="/#services" onClick={() => setIsSidebarOpen(false)}>Xidmətlər</Link></li>
            <li><Link to="/#projects" onClick={() => setIsSidebarOpen(false)}>Layihələr</Link></li>
            <li><Link to="/#contact" onClick={() => setIsSidebarOpen(false)}>Əlaqə</Link></li>
          </ul>
        </nav>
      </div>
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
    </header>
  );
};

export default Header;
