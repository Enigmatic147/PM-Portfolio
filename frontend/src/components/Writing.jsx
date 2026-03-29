import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogPosts } from '../services/api';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';

const Writing = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getAllBlogPosts();
      setPosts(data.posts);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  if (isLoading) {
    return (
      <section id="writing" className="py-24 px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-600">Loading posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="writing" className="py-24 px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
            Writing
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Weekly dispatches from the PM trenches
          </p>
          <p className="text-base text-neutral-500 mt-2 max-w-3xl">
            Every week I write about product strategy, GTM, data-driven decision making, and the reality of building SaaS products — without the fluff.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block border border-neutral-200 bg-white hover:border-neutral-400 transition-all duration-300 hover:shadow-md group"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Number */}
                  <div className="text-6xl md:text-7xl font-serif font-bold text-neutral-200 group-hover:text-neutral-300 transition-colors">
                    {post.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-neutral-500">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span className="font-medium text-black">{post.category}</span>
                      <span>•</span>
                      <Badge variant="outline" className={`text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                        {post.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-3 leading-tight group-hover:text-neutral-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-base text-neutral-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-medium text-black group-hover:translate-x-1 transition-transform">
                      <span>{post.readTime}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;