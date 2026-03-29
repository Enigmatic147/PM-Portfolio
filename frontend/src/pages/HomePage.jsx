import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import CaseStudies from '../components/CaseStudies';
import Writing from '../components/Writing';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <CaseStudies />
      <Writing />
      <Contact />
    </div>
  );
};

export default HomePage;