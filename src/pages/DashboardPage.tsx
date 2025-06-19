import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu'; // Custom component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"; // For toast notifications

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  console.log('DashboardPage loaded');

  const handleLogout = () => {
    // Simulate logout process
    console.log('User logging out');
    toast.info("You have been logged out.");
    // Clear user session/token here
    navigate('/login');
  };

  const handleShowToast = () => {
    toast.success("Here's a sample toast notification!", {
        description: "This is a test of the sonner toast system.",
        action: {
            label: "Undo",
            onClick: () => console.log("Undo action triggered"),
        },
    });
  };

  // Placeholder user data - in a real app, this would come from context/store/API
  const MOCK_USER = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=john.doe@example.com',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavigationMenu
        userName={MOCK_USER.name}
        userEmail={MOCK_USER.email}
        userAvatarUrl={MOCK_USER.avatarUrl}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Dashboard, {MOCK_USER.name}!</CardTitle>
              <CardDescription>
                This is your main hub for application activities and information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                From here, you can manage your account, view recent activity,
                and access various features of the application.
              </p>
              <p>
                The navigation menu above provides links to different sections.
                Your user profile and settings can be accessed via the avatar dropdown.
              </p>
              <Button onClick={handleShowToast} variant="outline">
                Show Sample Toast
              </Button>
            </CardContent>
          </Card>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for dashboard widgets/cards */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Some interesting statistics could go here.</p>
                 <ul className="mt-2 space-y-1">
                    <li>Active Projects: 5</li>
                    <li>Pending Tasks: 12</li>
                    <li>Notifications: 3</li>
                 </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">A feed of recent actions or updates.</p>
                 <ul className="mt-2 space-y-1 text-xs">
                    <li>Logged in successfully.</li>
                    <li>Updated profile picture.</li>
                    <li>Viewed pricing page.</li>
                 </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Links to documentation or support channels.</p>
                <Button variant="link" className="p-0 h-auto mt-2">Visit Help Center</Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardPage;