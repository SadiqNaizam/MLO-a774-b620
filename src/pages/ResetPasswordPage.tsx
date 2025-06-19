import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthFormCard from '@/components/AuthFormCard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Example: Get token from URL

  console.log('ResetPasswordPage loaded');

  if (!token) {
    // This check could be more robust or redirect
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Invalid Link</AlertTitle>
                <AlertDescription>
                    The password reset link is invalid or has expired. Please request a new one.
                    <Link to="/forgot-password" className="block mt-2 text-primary hover:underline">Request new link</Link>
                </AlertDescription>
            </Alert>
        </div>
    );
  }


  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    // Simulate API call with token
    console.log('Reset password attempt for token:', token, 'with new password.');
    // Simulate successful password reset
    setTimeout(() => {
      toast.success("Password successfully reset. Please login with your new password.");
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <AuthFormCard
        title="Set New Password"
        description="Enter your new password below. Make sure it's strong and memorable."
        footerContent={
            <div className="text-sm">
                Remembered your password?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">
                    Login
                </Link>
            </div>
        }
      >
        <form onSubmit={handleResetPassword} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Set New Password
          </Button>
        </form>
      </AuthFormCard>
    </div>
  );
};

export default ResetPasswordPage;