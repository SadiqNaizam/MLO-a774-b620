import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthFormCard from '@/components/AuthFormCard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);

  console.log('ForgotPasswordPage loaded');

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessageSent(false);

    if (!email) {
        setError("Please enter your email address.");
        return;
    }
    // Simulate API call
    console.log('Forgot password request for:', email);
    // Simulate successful link sending
    setTimeout(() => {
      toast.success("If an account exists for this email, a password reset link has been sent.");
      setMessageSent(true);
      // setEmail(''); // Optionally clear email field
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <AuthFormCard
        title="Forgot Password"
        description="Enter your email address and we'll send you a link to reset your password."
        footerContent={
          <div className="text-sm">
            <Link to="/login" className="font-medium text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        }
      >
        <form onSubmit={handleSendResetLink} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {messageSent && !error && (
            <Alert variant="default" className="bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-700 dark:text-green-300">Email Sent</AlertTitle>
              <AlertDescription className="text-green-600 dark:text-green-400">
                If an account exists for {email}, a password reset link has been sent. Please check your inbox (and spam folder).
              </AlertDescription>
            </Alert>
          )}
          {!messageSent && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {!messageSent && (
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          )}
        </form>
      </AuthFormCard>
    </div>
  );
};

export default ForgotPasswordPage;