import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllContactSubmissions, updateContactStatus, adminLogout } from '../services/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, LogOut, Mail, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminContactsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'read', 'replied'

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getAllContactSubmissions();
      setContacts(data.contacts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (contactId, status) => {
    try {
      await updateContactStatus(contactId, status);
      toast({
        title: "Status updated",
        description: `Contact marked as ${status}`
      });
      loadContacts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

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
                  Contact Messages
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  {contacts.length} total submissions
                </p>
              </div>
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
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-black text-white'
                : 'bg-white text-neutral-700 border border-neutral-300 hover:border-black'
            }`}
          >
            All ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'new'
                ? 'bg-black text-white'
                : 'bg-white text-neutral-700 border border-neutral-300 hover:border-black'
            }`}
          >
            New ({contacts.filter(c => c.status === 'new').length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'read'
                ? 'bg-black text-white'
                : 'bg-white text-neutral-700 border border-neutral-300 hover:border-black'
            }`}
          >
            Read ({contacts.filter(c => c.status === 'read').length})
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'replied'
                ? 'bg-black text-white'
                : 'bg-white text-neutral-700 border border-neutral-300 hover:border-black'
            }`}
          >
            Replied ({contacts.filter(c => c.status === 'replied').length})
          </button>
        </div>

        {/* Contacts List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12 bg-white border border-neutral-200 p-8">
            <Mail className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600">No contact messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white border border-neutral-200 p-6 hover:border-neutral-400 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-black">
                        {contact.name}
                      </h3>
                      <Badge variant="outline" className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {contact.email}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {new Date(contact.submittedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-700 mb-1">
                    Subject: {contact.subject}
                  </p>
                  <p className="text-neutral-600 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
                  {contact.status === 'new' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(contact.id, 'read')}
                      className="border-neutral-300 hover:border-black"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  {contact.status === 'read' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(contact.id, 'replied')}
                      className="border-neutral-300 hover:border-black"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Replied
                    </Button>
                  )}
                  <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
                    <Button
                      size="sm"
                      className="bg-black text-white hover:bg-neutral-800"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactsPage;
