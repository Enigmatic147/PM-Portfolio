import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Lock } from 'lucide-react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await adminLogin(credentials.username, credentials.password);
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.detail || "Invalid username or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-black mb-2">
            Admin Login
          </h1>
          <p className="text-neutral-600">
            pranaymishra.pm
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-neutral-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-sm font-semibold text-black mb-2">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleChange}
                className="border-neutral-300 focus:border-black"
                placeholder="admin"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-black mb-2">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="border-neutral-300 focus:border-black"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-neutral-800 transition-colors font-medium"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Default credentials: admin / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;