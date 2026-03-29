import React from 'react';
import { personalInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-serif font-semibold mb-1">
              {personalInfo.website}
            </p>
            <p className="text-sm text-neutral-400">
              Built with intention · Updated weekly
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Email
            </a>
            <span className="text-neutral-600">© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;