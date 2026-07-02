import React from 'react';
import { Globe, Palette, Server, Cpu, Link } from 'lucide-react';
import './index.css';

const Services = () => {
  const servicesList = [
    {
      icon: <Globe size={28} />,
      title: 'Web Development',
      description: 'Creating highly responsive, fast-loading, and visually attractive websites customized to match modern business and brand identities.'
    },
    {
      icon: <Palette size={28} />,
      title: 'Frontend Development',
      description: 'Converting structural design mockups into semantic, reactive HTML, CSS, and React.js templates with smooth transitions.'
    },
    {
      icon: <Server size={28} />,
      title: 'Backend Development',
      description: 'Architecting scalable server-side systems, connecting databases, handling middlewares, and integrating security measures.'
    },
    {
      icon: <Cpu size={28} />,
      title: 'Full Stack Development',
      description: 'Building end-to-end MERN (MongoDB, Express, React, Node) applications equipped with clean API paths and admin dashboards.'
    },
    {
      icon: <Link size={28} />,
      title: 'API Development',
      description: 'Writing robust, standard, and highly secured RESTful APIs with thorough input validation protocols and structured error responses.'
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <h2 className="section-title">My Services</h2>

        <div className="services-grid">
          {servicesList.map((service, idx) => (
            <div key={idx} className="glass-card service-card">
              <div className="service-icon-wrap">
                {service.icon}
              </div>
              <h3 className="service-title-text">{service.title}</h3>
              <p className="service-desc-text">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
