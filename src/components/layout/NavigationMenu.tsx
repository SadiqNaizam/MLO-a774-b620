import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut, Settings, User as UserIcon, Menu as MenuIcon } from 'lucide-react'; // Renamed User to UserIcon to avoid conflict
import { cn } from '@/lib/utils';

interface NavigationMenuProps {
  userName?: string;
  userEmail?: string;
  userAvatarUrl?: string;
  onLogout: () => void;
  className?: string;
  // TODO: Add navLinks prop for dynamic navigation items
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  userName = "User",
  userEmail,
  userAvatarUrl,
  onLogout,
  className,
}) => {
  console.log("Rendering NavigationMenu for user:", userName);
  const userInitials = userName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || 'U';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Placeholder for main navigation links, eventually should come from props or config
  const mainNavLinks = [
    { to: "/dashboard", label: "Overview", icon: <LayoutDashboard className="mr-2 h-4 w-4" /> },
    // Add more dashboard links here e.g.
    // { to: "/dashboard/analytics", label: "Analytics" },
    // { to: "/dashboard/reports", label: "Reports" },
  ];


  return (
    <header className={cn("sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            {/* Replace with your App's Logo/Icon */}
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">MyApp</span>
          </Link>
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
            {mainNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* User Avatar and Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userAvatarUrl} alt={userName} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  {userEmail && <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile"><UserIcon className="mr-2 h-4 w-4" />Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Overlay or Drawer style */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col space-y-1 px-2 py-3">
            {mainNavLinks.map(link => (
              <Link
                key={`mobile-${link.to}`}
                to={link.to}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
             {/* Mobile specific user links if needed, or part of mainNavLinks */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationMenu;