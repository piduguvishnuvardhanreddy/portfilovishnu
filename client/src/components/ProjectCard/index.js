import React from 'react';
import { Github, ExternalLink, Box } from 'lucide-react';
import { getImageUrl } from '../../services/api';
import './index.css';

const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, githubLink, liveLink } = project;

  return (
    <div className="glass-card project-card-component">
      <div className="project-image-wrap">
        {image ? (
          <img src={getImageUrl(image)} alt={title} className="project-card-image" />
        ) : (
          <div className="project-image-placeholder">
            <Box size={40} className="placeholder-icon" />
          </div>
        )}
        <div className="project-hover-overlay">
          <div className="project-overlay-links">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="overlay-icon-btn" title="GitHub Code">
                <Github size={20} />
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="overlay-icon-btn" title="Live Demo">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="project-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
        
        <div className="project-tags">
          {technologies.map((tech, idx) => (
            <span key={idx} className="project-tag">{tech}</span>
          ))}
        </div>
        
        <div className="project-card-actions">
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-action-link">
              <Github size={16} /> Code
            </a>
          )}
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-action-link primary-action">
              <ExternalLink size={16} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
