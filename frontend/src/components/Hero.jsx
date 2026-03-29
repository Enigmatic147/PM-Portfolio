import React from 'react';
import { heroData } from '../mock';
import { Database, Users, TrendingUp, Target } from 'lucide-react';

const iconMap = {
  database: Database,
  users: Users,
  'trending-up': TrendingUp,
  target: Target
};

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="max-w-4xl">
          <p className="text-sm font-medium text-neutral-600 mb-4 tracking-wide uppercase">
            Senior Product Manager · SaaS & Healthtech
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black leading-tight mb-6">
            {heroData.headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl">
            {heroData.description}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {heroData.skills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            return (
              <div
                key={index}
                className="p-6 border border-neutral-200 hover:border-neutral-400 transition-all duration-300 hover:shadow-md"
              >
                <Icon className="h-6 w-6 text-black mb-4" />
                <h3 className="text-base font-semibold text-black mb-2">{skill.title}</h3>
                <p className="text-sm text-neutral-600">{skill.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-neutral-200">
          {heroData.stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-serif font-bold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;