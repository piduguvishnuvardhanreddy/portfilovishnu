const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Models
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');
const Contact = require('../models/Contact');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const projects = [
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

const skills = [
  // Frontend
  { name: 'React.js', category: 'Frontend', level: 95, icon: 'Code' },
  { name: 'Redux Toolkit', category: 'Frontend', level: 90, icon: 'Cpu' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, icon: 'FileCode' },
  { name: 'Next.js', category: 'Frontend', level: 85, icon: 'Layers' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', level: 90, icon: 'Server' },
  { name: 'Express.js', category: 'Backend', level: 92, icon: 'Terminal' },
  { name: 'RESTful APIs', category: 'Backend', level: 95, icon: 'Link' },
  
  // Database
  { name: 'MongoDB', category: 'Database', level: 90, icon: 'Database' },
  { name: 'PostgreSQL', category: 'Database', level: 80, icon: 'Table' },
  { name: 'Redis', category: 'Database', level: 75, icon: 'Zap' },
  
  // Languages
  { name: 'JavaScript (ES6+)', category: 'Programming Languages', level: 95, icon: 'FileJson' },
  { name: 'TypeScript', category: 'Programming Languages', level: 85, icon: 'ShieldCheck' },
  { name: 'Python', category: 'Programming Languages', level: 70, icon: 'Play' },
  
  // Tools
  { name: 'Git & GitHub', category: 'Tools', level: 90, icon: 'GitFork' },
  { name: 'Docker', category: 'Tools', level: 80, icon: 'Box' },
  
  // Deployment
  { name: 'AWS (EC2, S3)', category: 'Deployment', level: 80, icon: 'Cloud' },
  { name: 'Vercel / Netlify', category: 'Deployment', level: 95, icon: 'UploadCloud' }
];

const experiences = [
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

const educations = [
  {
    college: 'Global Institute of Technology',
    degree: 'B.Tech in Computer Science & Engineering',
    CGPA: '9.2 / 10',
    year: '2018 - 2022'
  }
];

const certificates = [
  {
    title: 'MERN Full Stack Developer Certification',
    issuer: 'Udemy Academy',
    date: 'Dec 2023',
    image: 'https://drive.google.com/uc?export=view&id=1NLwpia94eGV0W5AVh2Fx_rpmmTtbXfkd'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Aug 2024',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await Project.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    await Certificate.deleteMany();
    await Contact.deleteMany();
    console.log('Cleared existing collections...');

    // Insert new data
    await Project.insertMany(projects);
    console.log('Seeded Projects!');

    await Skill.insertMany(skills);
    console.log('Seeded Skills!');

    await Experience.insertMany(experiences);
    console.log('Seeded Experiences!');

    await Education.insertMany(educations);
    console.log('Seeded Educations!');

    await Certificate.insertMany(certificates);
    console.log('Seeded Certificates!');

    console.log('Database Seeding Completed Successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
