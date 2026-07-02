import React from 'react';
import { Calendar, Mail, MapPin, User, Award, CheckCircle2, ThumbsUp } from 'lucide-react';
import './index.css';

const About = () => {
  const infoItems = [
    { icon: <User size={18} />, label: 'Name', value: 'Vishnu' },
    { icon: <Mail size={18} />, label: 'Email', value: 'vishnuvardhanreddypidugu99@gmail.com' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Hyderabad, India' },
    { icon: <Calendar size={18} />, label: 'Availability', value: 'Full-Time / Freelance' },
  ];

  const stats = [
    { icon: <Award className="stat-icon-purple" />, count: '1+', label: 'Years Experience' },
    { icon: <CheckCircle2 className="stat-icon-cyan" />, count: '6+', label: 'Projects Completed' },
    { icon: <ThumbsUp className="stat-icon-pink" />, count: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          <div className="about-image-area">
            <div className="about-img-container">
              <img
                src="/profile.png"
                alt="About Professional"
                className="about-img"
              />
              <div className="about-img-accent"></div>
            </div>
          </div>

          <div className="about-details">
            <h3 className="about-subtitle">Empowering Brands with Web Solutions</h3>
            <p className="about-description">
              As a dedicated MERN Stack Developer, I bridge the gap between creative visual designs and robust engineering. I have built scalable SaaS backends, customizable user-facing administration interfaces, and interactive dashboards that deliver premium user experiences.
            </p>
            <p className="about-objective">
              <strong>Career Objective:</strong> To join a collaborative engineering team where I can apply my JavaScript/MERN expertise to solve real-world problems, optimize performance, and scale backend and frontend web systems.
            </p>

            <div className="about-info-grid">
              {infoItems.map((item, idx) => (
                <div key={idx} className="info-item">
                  <span className="info-icon">{item.icon}</span>
                  <div className="info-text">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card stat-card">
                  <div className="stat-header">
                    {stat.icon}
                    <span className="stat-count">{stat.count}</span>
                  </div>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
