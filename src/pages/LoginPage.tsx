import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthFormCard from '@/components/AuthFormCard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('user@example.com'); // Default for easier testing
  const [password, setPassword] = useState('password123'); // Default for easier testing
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Simulate API call
    console.log('Login attempt with:', { email, password, rememberMe });
    if (email === 'user@example.com' && password === 'password123') {
      // Simulate successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <AuthFormCard
        title="Login to Your Account"
        description="Enter your credentials to access your dashboard."
        footerContent={
          <>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </>
        }
      >
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember-me" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </AuthFormCard>
    </div>
  );
};

export default LoginPage;