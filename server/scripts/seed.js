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
