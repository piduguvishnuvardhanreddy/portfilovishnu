import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, ArrowRight, Download, Send } from 'lucide-react';
import './index.css';

const Hero = () => {
  const words = ['MERN Stack Developer', 'Full Stack Developer', 'React Specialist', 'Backend Engineer'];
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(120);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    window.open('https://drive.google.com/file/d/16JnuHIo7y8FgoZoXvD3MGbxtHh7SJ8Dl/view?usp=sharing', '_blank');
  };

  return (
    <section id="home" className="section hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h4 className="hero-welcome">WELCOME TO MY PORTFOLIO</h4>
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">Vishnu</span>
          </h1>
          <h2 className="hero-subtitle">
            I am a <span className="typewriter-text">{text}</span>
            <span className="typewriter-cursor">|</span>
          </h2>
          <p className="hero-description">
            Passionate full-stack developer specializing in JavaScript technologies. I design and build highly performant, accessible, and responsive web applications with a focus on seamless user experiences.
          </p>

          <div className="hero-ctas">
            <button onClick={scrollToContact} className="btn-primary">
              Hire Me <ArrowRight size={18} />
            </button>
            <button onClick={downloadResume} className="btn-secondary">
              Download Resume <Download size={18} />
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/piduguvishnuvardhanreddy" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vishnuvardhan-reddy-pidugu/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="hero-image-area">
          <div className="profile-image-wrapper">
            <img 
              src="/profile.png" 
              alt="Profile" 
              className="profile-img"
            />
            <div className="profile-border-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
