import { Toaster as ShadcnToaster } from "@/components/ui/toaster"; // Default Toaster from shadcn
import { Toaster as Sonner } from "@/components/ui/sonner"; // Sonner for richer notifications
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import Homepage from "./pages/Homepage"; // Assuming Homepage exists or will be added
import AboutPage from "./pages/AboutPage"; // Assuming AboutPage exists or will be added

// Newly generated auth pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";

import NotFound from "./pages/NotFound"; // Always Must Include

const queryClient = new QueryClient();

// Mock authentication check - replace with actual auth logic
const isAuthenticated = () => {
  // For demonstration, let's assume login to dashboard sets a flag or token
  // This is a naive check. In a real app, use context, localStorage, etc.
  // For this example, we'll just check if the path is related to dashboard to simulate
  // a logged-in state for dashboard itself. A better approach is needed for real auth.
  // For simplicity, we are not implementing full auth guard here.
  // Let's assume if user tries to access '/dashboard', they should be "authenticated" for this example.
  // A more robust solution would involve checking a token.
  return !!localStorage.getItem("authToken"); // Example: check for a token
};

// ProtectedRoute component (example, can be refined)
// For this exercise, we'll keep routing simple.
// Proper protected routes would involve checking auth status and redirecting.
// For now, DashboardPage itself can handle redirect if not "logged in" (e.g. via NavigationMenu's logout or a useEffect).
// For a simpler setup for now, we will directly route.

const App = () => {
  // A simple effect to set a mock token when login page is visited with default creds,
  // to somewhat simulate login for Dashboard access.
  // THIS IS PURELY FOR DEMONSTRATION and not a real auth flow.
  if (window.location.pathname === '/login' && localStorage.getItem('mockLogin') === 'true') {
      localStorage.setItem('authToken', 'mockToken');
      localStorage.removeItem('mockLogin');
  }
  if (window.location.pathname === '/dashboard' && !localStorage.getItem('authToken')) {
     // If trying to access dashboard without token, clear it for re-login attempt.
     // This is a very basic guard.
  }


  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShadcnToaster /> {/* For shadcn's useToast hook */}
      <Sonner richColors position="top-right" /> {/* For sonner's toast() function */}
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} /> 
          <Route path="/about" element={<AboutPage />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Example: /reset-password?token=xxxx */}

          {/* Protected routes - A real app would have proper auth guards */}
          {/* For now, direct access. NavigationMenu has logout. */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* If you want a simple redirect if not authenticated for dashboard:
          <Route 
            path="/dashboard" 
            element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" replace />} 
          />
          */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;