import React, { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard';
import { getProjects } from '../../services/api';
import './index.css';

const DEFAULT_PROJECTS = [
  {
    title: 'E-Commerce Cloud Engine',
    description: 'A distributed e-commerce backend built with Node.js, Express, and MongoDB, leveraging Redis for caching and Stripe for payments. Designed for high scalability and throughput.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'Stripe'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    featured: true
  },
  {
    title: 'DevMeetup Planner',
    description: 'A full-stack React and GraphQL meetup organizer platform where developers can join events, form groups, share calendars, and interact using an in-app chat room.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'GraphQL', 'Apollo', 'Express', 'MongoDB'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    featured: true
  },
  {
    title: 'Creative Studio Portfolio',
    description: 'A modern, highly immersive frontend portfolio featuring complex layouts, smooth WebGL transitions, and micro-interactions optimized for low-bandwidth mobile screens.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Vite'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    featured: false
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
