import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import './index.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo" onClick={handleScrollTop}>
            <span>V</span>ISHNU
          </h2>
          <p className="footer-desc">
            Passionate MERN Stack Developer building responsive, reliable, and premium web systems.
          </p>
        </div>

        <div className="footer-links-wrap">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><span onClick={() => handleNavClick('home')} className="footer-link">Home</span></li>
            <li><span onClick={() => handleNavClick('about')} className="footer-link">About</span></li>
            <li><span onClick={() => handleNavClick('skills')} className="footer-link">Skills</span></li>
            <li><span onClick={() => handleNavClick('projects')} className="footer-link">Projects</span></li>
            <li><span onClick={() => handleNavClick('contact')} className="footer-link">Contact</span></li>
          </ul>
        </div>

        <div className="footer-social-wrap">
          <h3 className="footer-title">Follow Me</h3>
          <div className="footer-socials">
            <a href="https://github.com/piduguvishnuvardhanreddy" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vishnuvardhan-reddy-pidugu/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">&copy; {currentYear} Vishnu. All rights reserved.</span>
        <button onClick={handleScrollTop} className="footer-scroll-btn" title="Scroll to Top">
          <ArrowUp size={16} /> Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
