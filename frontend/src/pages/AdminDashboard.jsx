import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminUser, adminLogout, getAllAdminBlogPosts, getAllContactSubmissions } from '../services/api';
import { Button } from '../components/ui/button';
import { LogOut, FileText, Mail, PlusCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    newContacts: 0
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const adminUser = getAdminUser();
    setUser(adminUser);
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [blogData, contactData] = await Promise.all([
        getAllAdminBlogPosts(),
        getAllContactSubmissions()
      ]);

      const published = blogData.posts.filter(p => p.published).length;
      const draft = blogData.posts.filter(p => !p.published).length;
      const newContacts = contactData.contacts.filter(c => c.status === 'new').length;

      setStats({
        totalPosts: blogData.posts.length,
        publishedPosts: published,
        draftPosts: draft,
        newContacts: newContacts
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-black">
              Admin Dashboard
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Welcome back, {user?.username}
            </p>
          </div>
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-neutral-200 p-6">
            <div className="text-3xl font-serif font-bold text-black mb-2">
              {stats.totalPosts}
            </div>
            <div className="text-sm text-neutral-600">Total Blog Posts</div>
          </div>
          <div className="bg-white border border-neutral-200 p-6">
            <div className="text-3xl font-serif font-bold text-black mb-2">
              {stats.publishedPosts}
            </div>
            <div className="text-sm text-neutral-600">Published</div>
          </div>
          <div className="bg-white border border-neutral-200 p-6">
            <div className="text-3xl font-serif font-bold text-black mb-2">
              {stats.draftPosts}
            </div>
            <div className="text-sm text-neutral-600">Drafts</div>
          </div>
          <div className="bg-white border border-neutral-200 p-6">
            <div className="text-3xl font-serif font-bold text-black mb-2">
              {stats.newContacts}
            </div>
            <div className="text-sm text-neutral-600">New Messages</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/blog"
            className="bg-white border border-neutral-200 p-8 hover:border-neutral-400 transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-6 w-6 text-black" />
                  <h2 className="text-xl font-serif font-bold text-black">
                    Manage Blog Posts
                  </h2>
                </div>
                <p className="text-neutral-600 mb-4">
                  Create, edit, and manage your blog content
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span>{stats.publishedPosts} published</span>
                  <span>•</span>
                  <span>{stats.draftPosts} drafts</span>
                </div>
              </div>
              <PlusCircle className="h-8 w-8 text-neutral-300 group-hover:text-black transition-colors" />
            </div>
          </Link>

          <Link
            to="/admin/contacts"
            className="bg-white border border-neutral-200 p-8 hover:border-neutral-400 transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-6 w-6 text-black" />
                  <h2 className="text-xl font-serif font-bold text-black">
                    Contact Messages
                  </h2>
                </div>
                <p className="text-neutral-600 mb-4">
                  View and manage contact form submissions
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span>{stats.newContacts} new messages</span>
                </div>
              </div>
              <Mail className="h-8 w-8 text-neutral-300 group-hover:text-black transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;