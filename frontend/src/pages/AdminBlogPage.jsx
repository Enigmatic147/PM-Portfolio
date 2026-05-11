import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdminBlogPosts, deleteBlogPost, adminLogout } from '../services/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { PlusCircle, Edit, Trash2, ArrowLeft, LogOut } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminBlogPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  loadContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const loadPosts = async () => {
    try {
      const data = await getAllAdminBlogPosts();
      setPosts(data.posts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteBlogPost(postId);
      toast({
        title: "Post deleted",
        description: "Blog post has been deleted successfully"
      });
      loadPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
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

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-serif font-bold text-black">
                  Blog Management
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  {posts.length} total posts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/admin/blog/new">
                <Button className="bg-black text-white hover:bg-neutral-800">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-neutral-300 hover:border-black"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-4">No blog posts yet</p>
            <Link to="/admin/blog/new">
              <Button className="bg-black text-white hover:bg-neutral-800">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-neutral-200 p-6 hover:border-neutral-400 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-serif font-bold text-neutral-300">
                        {post.number}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-black">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge variant="outline" className="border-neutral-300 text-neutral-700">
                        {post.category}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(post.difficulty)}>
                        {post.difficulty}
                      </Badge>
                      <span className="text-neutral-500">{post.readTime}</span>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link to={`/admin/blog/edit/${post.id}`}>
                      <Button variant="outline" size="icon" className="border-neutral-300 hover:border-black">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="border-neutral-300 hover:border-red-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogPage;
