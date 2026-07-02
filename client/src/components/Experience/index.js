import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { getExperiences } from '../../services/api';
import './index.css';

const DEFAULT_EXPERIENCE = [
  {
    company: 'Vortex Tech Labs',
    role: 'Senior MERN Stack Developer',
    duration: '2024 - Present',
    description: 'Lead frontend and backend development for scalable SaaS web applications. Reduced database query latencies by 40% through extensive query profiling and Redis caching layers. Mentored junior development teams and standardized code formatting.'
  },
  {
    company: 'ByteCrafters Studio',
    role: 'Full Stack Engineer',
    duration: '2022 - 2024',
    description: 'Designed responsive user portals using React.js and CSS Grid. Programmed highly reusable backend API controllers and refactored relational database models into optimal MongoDB schema setups.'
  }
];

const Experience = () => {
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const fetched = await getExperiences();
        if (fetched && fetched.length > 0) {
          setExperiences(fetched);
        }
      } catch (err) {
        console.error('Failed to load experiences from DB, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>

        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={exp._id || idx} className="timeline-item">
              <div className="timeline-dot">
                <Briefcase size={16} />
              </div>
              <div className="timeline-date">
                <span className="date-badge">
                  <Calendar size={14} /> {exp.duration}
                </span>
              </div>
              <div className="glass-card timeline-content">
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
