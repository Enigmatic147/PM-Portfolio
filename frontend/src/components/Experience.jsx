import React from 'react';
import { experienceData } from '../mock';
import { Badge } from './ui/badge';

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            Experience
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Where I've worked & what I built
          </p>
          <p className="text-base text-neutral-500 mt-2 max-w-3xl">
            Nine years across SaaS, healthtech, and enterprise systems — a timeline of the roles and outcomes that shaped how I think about product.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {experienceData.map((job, index) => (
            <div
              key={job.id}
              className="relative pl-8 md:pl-12 border-l-2 border-neutral-300 pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-black border-4 border-white"></div>

              {/* Content */}
              <div className="bg-white p-8 border border-neutral-200 hover:border-neutral-400 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-2">
                      {job.period}
                    </p>
                    <h3 className="text-2xl font-serif font-bold text-black mb-1">
                      {job.company}
                    </h3>
                    <p className="text-sm text-neutral-500">{job.type}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium">
                      {job.role}
                    </span>
                  </div>
                </div>

                <p className="text-base text-neutral-700 leading-relaxed mb-6">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs font-normal border-neutral-300 text-neutral-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;