import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
import { getProjects } from '../../services/api';
import './index.css';

const DEFAULT_PROJECTS = [
  {
    title: 'Student Academic Performance Prediction',
    description:
      'An AI-powered web application that predicts student academic performance using machine learning techniques. The platform provides an intuitive interface for entering student data, generating performance predictions, and visualizing insights to help educators and students make data-driven decisions.',
    image:
      'https://res.cloudinary.com/dmaipoa99/image/upload/v1784286631/ChatGPT_Image_Jul_17_2026_03_59_57_PM_yex5py.png',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Machine Learning',
      'Python'
    ],
    githubLink:
      'https://github.com/piduguvishnuvardhanreddy/studentperformanceprediction',
    liveLink:
      'https://studentperformanceprediction-naq7pey32.vercel.app/',
    featured: true
  },
  {
    title: 'Fleet Management System',
    description:
      'A comprehensive fleet management platform designed to streamline logistics operations. The system enables vehicle tracking, shipment management, driver monitoring, route planning, and real-time operational insights through a modern, responsive dashboard.',
    image:
      'https://res.cloudinary.com/dmaipoa99/image/upload/v1784286624/ChatGPT_Image_Jul_17_2026_04_02_54_PM_j6pa2x.png',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Tailwind CSS'
    ],
    githubLink:
      'https://github.com/piduguvishnuvardhanreddy/finallogisticsvishnufrontend',
    liveLink:
      'https://cargovishnufinalfrontend.vercel.app/',
    featured: true
  },
  {
    title: 'HRMS Dashboard',
    description:
      'A modern Human Resource Management System (HRMS) dashboard that simplifies employee management, attendance tracking, leave requests, payroll administration, and organizational analytics with an intuitive and responsive user interface.',
    image:
      'https://res.cloudinary.com/dmaipoa99/image/upload/v1784286612/ChatGPT_Image_Jul_17_2026_04_03_00_PM_lgzha8.png',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Tailwind CSS'
    ],
    githubLink:
      'https://github.com/piduguvishnuvardhanreddy/vishnutechhrms',
    liveLink:
      'https://vishnutechhrms-dfvkeul9l-vishnus-projects-1e046f50.vercel.app',
    featured: true
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetched = await getProjects();
        if (fetched && fetched.length > 0) {
          setProjects(fetched);
        }
      } catch (err) {
        console.error('Failed to load projects from DB, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filterOptions = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;

    const techs = project.technologies.map(t => t.toLowerCase());

    if (filter === 'Full Stack') {
      return (techs.includes('react.js') || techs.includes('react') || techs.includes('next.js')) &&
        (techs.includes('node.js') || techs.includes('node') || techs.includes('express') || techs.includes('graphql'));
    }

    if (filter === 'Frontend') {
      return techs.includes('react.js') || techs.includes('react') || techs.includes('html5') || techs.includes('css3') || techs.includes('vite') || techs.includes('next.js');
    }

    if (filter === 'Backend') {
      return techs.includes('node.js') || techs.includes('node') || techs.includes('express') || techs.includes('graphql') || techs.includes('mongodb') || techs.includes('redis');
    }

    return true;
  });

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        <div className="projects-filter">
          {filterOptions.map((option, idx) => (
            <button
              key={idx}
              className={`filter-btn ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <div key={project._id || idx} className="project-grid-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
