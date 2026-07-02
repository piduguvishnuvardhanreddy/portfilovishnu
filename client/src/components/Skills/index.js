import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { getSkills } from '../../services/api';
import './index.css';

const DEFAULT_SKILLS = [
  { name: 'React.js', category: 'Frontend', level: 95, icon: 'Code' },
  { name: 'Redux Toolkit', category: 'Frontend', level: 90, icon: 'Cpu' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, icon: 'FileCode' },
  { name: 'Next.js', category: 'Frontend', level: 85, icon: 'Layers' },
  { name: 'Node.js', category: 'Backend', level: 90, icon: 'Server' },
  { name: 'Express.js', category: 'Backend', level: 92, icon: 'Terminal' },
  { name: 'RESTful APIs', category: 'Backend', level: 95, icon: 'Link' },
  { name: 'MongoDB', category: 'Database', level: 90, icon: 'Database' },
  { name: 'PostgreSQL', category: 'Database', level: 80, icon: 'Table' },
  { name: 'Redis', category: 'Database', level: 75, icon: 'Zap' },
  { name: 'JavaScript (ES6+)', category: 'Programming Languages', level: 95, icon: 'FileJson' },
  { name: 'TypeScript', category: 'Programming Languages', level: 85, icon: 'ShieldCheck' },
  { name: 'Python', category: 'Programming Languages', level: 70, icon: 'Play' },
  { name: 'Git & GitHub', category: 'Tools', level: 90, icon: 'GitFork' },
  { name: 'Docker', category: 'Tools', level: 80, icon: 'Box' },
  { name: 'AWS (EC2, S3)', category: 'Deployment', level: 80, icon: 'Cloud' },
  { name: 'Vercel / Netlify', category: 'Deployment', level: 95, icon: 'UploadCloud' }
];

const Skills = () => {
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetched = await getSkills();
        if (fetched && fetched.length > 0) {
          setSkills(fetched);
        }
      } catch (err) {
        console.error('Failed to load skills from DB, using default values:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Programming Languages', 'Tools', 'Deployment'];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Dynamic Lucide Icon Render Helper
  const renderIcon = (iconName) => {
    const LucideIcon = Icons[iconName] || Icons.Code;
    return <LucideIcon size={22} />;
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>

        <div className="skills-categories">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => (
            <div key={skill._id || idx} className="glass-card skill-card">
              <div className="skill-meta">
                <span className="skill-icon-wrap">{renderIcon(skill.icon)}</span>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category-label">{skill.category}</span>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-progress-container">
                <div 
                  className="skill-progress-bar" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
