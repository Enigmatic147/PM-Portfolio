import React from 'react';
import { caseStudiesData } from '../mock';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            Case Studies
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Work that shaped my craft
          </p>
          <p className="text-base text-neutral-500 mt-2 max-w-3xl">
            Deep dives into the problems I've solved — the thinking, the tradeoffs, and the outcomes.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {caseStudiesData.map((study) => (
            <div
              key={study.id}
              className="border border-neutral-200 hover:border-neutral-400 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="p-8">
                <p className="text-xs font-medium text-neutral-500 mb-4 uppercase tracking-wide">
                  {study.category}
                </p>
                <h3 className="text-2xl font-serif font-bold text-black mb-4 leading-tight">
                  {study.title}
                </h3>
                <p className="text-base text-neutral-600 mb-6 leading-relaxed">
                  {study.description}
                </p>
                <div className="pt-6 border-t border-neutral-200">
                  <div className="text-4xl font-serif font-bold text-black mb-1">
                    {study.metric}
                  </div>
                  <div className="text-sm text-neutral-600 mb-6">
                    {study.metricLabel}
                  </div>
                  <Button
                    variant="ghost"
                    className="px-0 text-black hover:text-neutral-600 group-hover:translate-x-1 transition-transform"
                  >
                    Read case study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Card */}
        <div className="border-2 border-dashed border-neutral-300 p-12 text-center">
          <div className="text-6xl font-serif font-bold text-neutral-300 mb-4">+</div>
          <h3 className="text-xl font-serif font-bold text-neutral-400 mb-2">
            Coming soon
          </h3>
          <p className="text-neutral-500">Your next big win</p>
          <p className="text-sm text-neutral-400 mt-2">
            A slot for the next project you're most proud of.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;