import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import slogob from '../assets/Slogob.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="footer-logo">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={slogob} alt="Semalı Fire Logo" className="footer-logo-img" style={{ maxHeight: '50px', width: 'auto' }} />
            </Link>
          </div>
          <p className="footer-about">
            Səmalı & Fire Alarm peşəkar yanğından mühafizə müəssisəsidir. Yanğın təhlükəsizliyi sistemlərinin quraşdırılması və servisi sahəsində illərin təcrübəsinə malikik.
          </p>
          <div className="footer-socials">
            <a href="#"><Twitter size={18} /></a>
            <a href="#"><Facebook size={18} /></a>
            <a href="#"><Linkedin size={18} /></a>
            <a href="#"><Instagram size={18} /></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Sürətli Keçid</h3>
          <ul>
            <li><Link to="/">Ana Səhifə</Link></li>
            <li><Link to="/haqqimizda">Haqqımızda</Link></li>
            <li><Link to="/#services">Xidmətlər</Link></li>
            <li><Link to="/#projects">Layihələr</Link></li>
            <li><Link to="/#contact">Əlaqə</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Əlaqə Məlumatları</h3>
          <ul className="contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Bakı şəhəri, Nərimanov rayonu</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href="mailto:f.a@semali.az">f.a@semali.az</a>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <a href="tel:+994502164771">+994 50 216 47 71</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>&copy; {new Date().getFullYear()} Səmalı & Fire Alarm. Bütün hüquqlar qorunur.</p>
          <div className="bottom-links">
            <a href="#">Məxfilik Siyasəti</a>
            <a href="#">İstifadə Şərtləri</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
