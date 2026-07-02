import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const downloadResume = () => {
    window.open('https://drive.google.com/file/d/16JnuHIo7y8FgoZoXvD3MGbxtHh7SJ8Dl/view?usp=sharing', '_blank');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <span>V</span>ISHNU
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><span onClick={() => handleNavClick('home')} className="nav-link">Home</span></li>
          <li><span onClick={() => handleNavClick('about')} className="nav-link">About</span></li>
          <li><span onClick={() => handleNavClick('skills')} className="nav-link">Skills</span></li>
          <li><span onClick={() => handleNavClick('projects')} className="nav-link">Projects</span></li>
          <li><span onClick={() => handleNavClick('experience')} className="nav-link">Experience</span></li>
          <li><span onClick={() => handleNavClick('education')} className="nav-link">Education</span></li>
          <li><span onClick={() => handleNavClick('services')} className="nav-link">Services</span></li>
          <li><span onClick={() => handleNavClick('certificates')} className="nav-link">Certificates</span></li>
          <li><span onClick={() => handleNavClick('contact')} className="nav-link">Contact</span></li>
          <li>
            <button className="nav-btn-admin" onClick={() => { setIsOpen(false); navigate('/admin'); }}>
              <Shield size={16} /> Admin
            </button>
          </li>
          <li>
            <button className="nav-btn-resume" onClick={downloadResume}>
              <Download size={16} /> Resume
            </button>
          </li>
        </ul>

        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
