import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createBlogPost, updateBlogPost, getAllAdminBlogPosts } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    difficulty: 'Beginner',
    readTime: '',
    excerpt: '',
    content: '',
    published: true
  });

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      const data = await getAllAdminBlogPosts();
      const post = data.posts.find(p => p.id === postId);
      if (post) {
        setFormData({
          title: post.title,
          category: post.category,
          difficulty: post.difficulty,
          readTime: post.readTime,
          excerpt: post.excerpt,
          content: post.content,
          published: post.published
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const postData = {
        ...formData,
        slug
      };

      if (postId) {
        await updateBlogPost(postId, postData);
        toast({
          title: "Post updated",
          description: "Blog post has been updated successfully"
        });
      } else {
        await createBlogPost(postData);
        toast({
          title: "Post created",
          description: "Blog post has been created successfully"
        });
      }
      navigate('/admin/blog');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to save blog post",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/blog">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-serif font-bold text-black">
                {postId ? 'Edit Post' : 'New Post'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-8 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-semibold text-black mb-2">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="border-neutral-300 focus:border-black"
              placeholder="Enter post title"
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="category" className="text-sm font-semibold text-black mb-2">
                Category *
              </Label>
              <Input
                id="category"
                name="category"
                type="text"
                required
                value={formData.category}
                onChange={handleChange}
                className="border-neutral-300 focus:border-black"
                placeholder="e.g. GTM Strategy"
              />
            </div>

            <div>
              <Label htmlFor="difficulty" className="text-sm font-semibold text-black mb-2">
                Difficulty *
              </Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="border-neutral-300 focus:border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="readTime" className="text-sm font-semibold text-black mb-2">
                Read Time *
              </Label>
              <Input
                id="readTime"
                name="readTime"
                type="text"
                required
                value={formData.readTime}
                onChange={handleChange}
                className="border-neutral-300 focus:border-black"
                placeholder="5 min read"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt" className="text-sm font-semibold text-black mb-2">
              Excerpt *
            </Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              required
              rows={3}
              value={formData.excerpt}
              onChange={handleChange}
              className="border-neutral-300 focus:border-black resize-none"
              placeholder="Brief description of the post"
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content" className="text-sm font-semibold text-black mb-2">
              Content * (Markdown supported)
            </Label>
            <Textarea
              id="content"
              name="content"
              required
              rows={20}
              value={formData.content}
              onChange={handleChange}
              className="border-neutral-300 focus:border-black resize-none font-mono text-sm"
              placeholder="Write your post content here using markdown formatting..."
            />
            <p className="text-xs text-neutral-500 mt-2">
              Use # for headings, ** for bold, - for lists, etc.
            </p>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center justify-between p-4 border border-neutral-200">
            <div>
              <Label htmlFor="published" className="text-sm font-semibold text-black">
                Publish Post
              </Label>
              <p className="text-xs text-neutral-500 mt-1">
                Make this post visible to the public
              </p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
            <Link to="/admin/blog">
              <Button type="button" variant="outline" className="border-neutral-300 hover:border-black">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white hover:bg-neutral-800"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : (postId ? 'Update Post' : 'Create Post')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogEditor;
