import React from 'react';
import Hero from '../Hero';
import About from '../About';
import Skills from '../Skills';
import Projects from '../Projects';
import Experience from '../Experience';
import Education from '../Education';
import Services from '../Services';
import Certificates from '../Certificates';
import Contact from '../Contact';
import ScrollToTop from '../ScrollToTop';

const Home = () => {
  return (
    <div className="home-layout-wrapper">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Services />
      <Certificates />
      <Contact />
      <ScrollToTop />
    </div>
  );
};

export default Home;
