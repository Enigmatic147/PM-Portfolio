import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPostsData } from '../mock';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPostsData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

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

  // Convert markdown-style content to HTML-like structure
  const renderContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // H1
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 mt-8">
            {line.replace('# ', '')}
          </h1>
        );
      }
      // H2
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-serif font-bold text-black mb-4 mt-8">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // H3
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-serif font-bold text-black mb-3 mt-6">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Bold text
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={index} className="text-base font-semibold text-black mb-3">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-base text-neutral-700 mb-2 ml-4">
            {line.replace('- ', '')}
          </li>
        );
      }
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="text-base text-neutral-700 mb-2 ml-4">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      // Block quote
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-neutral-300 pl-6 py-2 mb-4 italic text-neutral-600">
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      // Regular paragraph
      if (line.trim() !== '') {
        return (
          <p key={index} className="text-base text-neutral-700 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
      // Empty line
      return <div key={index} className="h-2"></div>;
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/#writing">
          <Button variant="ghost" className="mb-8 px-0 text-neutral-600 hover:text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Writing
          </Button>
        </Link>

        {/* Post Header */}
        <div className="mb-12 pb-8 border-b border-neutral-200">
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span className="px-3 py-1 bg-black text-white text-xs font-medium uppercase tracking-wide">
              {post.category}
            </span>
            <Badge variant="outline" className={`text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
              {post.difficulty}
            </Badge>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Post Content */}
        <article className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </article>

        {/* Back Button Bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Link to="/#writing">
            <Button variant="outline" className="border-neutral-300 hover:border-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;