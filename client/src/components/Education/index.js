import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { getEducations } from '../../services/api';
import './index.css';

const DEFAULT_EDUCATION = [
  {
    college: 'Global Institute of Technology',
    degree: 'B.Tech in Computer Science & Engineering',
    CGPA: '9.2 / 10',
    year: '2018 - 2022'
  }
];

const Education = () => {
  const [educations, setEducations] = useState(DEFAULT_EDUCATION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const fetched = await getEducations();
        if (fetched && fetched.length > 0) {
          setEducations(fetched);
        }
      } catch (err) {
        console.error('Failed to load education from DB, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEdu();
  }, []);

  return (
    <section id="education" className="section education-section">
      <div className="container">
        <h2 className="section-title">Education</h2>

        <div className="education-grid">
          {educations.map((edu, idx) => (
            <div key={edu._id || idx} className="glass-card education-card">
              <div className="edu-icon-wrap">
                <GraduationCap size={24} />
              </div>
              <div className="edu-meta">
                <span className="edu-year">
                  <Calendar size={14} /> {edu.year}
                </span>
                {edu.CGPA && (
                  <span className="edu-cgpa">
                    <Award size={14} /> CGPA: {edu.CGPA}
                  </span>
                )}
              </div>
              <h3 className="edu-degree">{edu.degree}</h3>
              <h4 className="edu-college">{edu.college}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
