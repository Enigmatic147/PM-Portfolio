import React from 'react';
import { aboutData, personalInfo } from '../mock';
import { Badge } from './ui/badge';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            About me
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            The person behind the products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Photo & Basic Info */}
          <div className="lg:col-span-1">
            <div className="border border-neutral-200 p-6 mb-6">
              <img
                src={personalInfo.photo}
                alt={personalInfo.name}
                className="w-full aspect-square object-cover mb-6 grayscale"
              />
              <h3 className="text-2xl font-serif font-bold text-black mb-2">
                {personalInfo.name}
              </h3>
              <p className="text-base text-neutral-600 mb-6">
                {personalInfo.title} · {personalInfo.tagline}
              </p>
              <div className="space-y-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-medium text-black hover:text-neutral-600 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block text-sm font-medium text-black hover:text-neutral-600 transition-colors"
                >
                  Email me
                </a>
              </div>
            </div>

            {/* Education */}
            <div className="border border-neutral-200 p-6">
              <h4 className="text-sm font-semibold text-black mb-4 uppercase tracking-wide">
                Education
              </h4>
              <div className="space-y-4">
                {aboutData.education.map((edu, index) => (
                  <div key={index}>
                    <p className="text-sm font-semibold text-black">{edu.degree}</p>
                    <p className="text-sm text-neutral-600">{edu.institution}</p>
                    <p className="text-xs text-neutral-500 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Skills */}
          <div className="lg:col-span-2">
            {/* Bio */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                {aboutData.bio}
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                {aboutData.bio2}
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {aboutData.bio3}
              </p>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutData.skills.map((skillGroup, index) => (
                <div key={index} className="border border-neutral-200 p-6">
                  <h4 className="text-sm font-semibold text-black mb-4 uppercase tracking-wide">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs font-normal bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;