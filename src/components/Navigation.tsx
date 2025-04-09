
import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface NavigationProps {
  logoUrl?: string;
  companyName?: string;
}

const Navigation = ({ 
  logoUrl = "/placeholder.svg", 
  companyName = "ShipTrack" 
}: NavigationProps) => {
  const location = useLocation();
  
  // For links inside router, use RouterLink
  // For navigation menu item, we need to use <a> tag because it's within the navigation context
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild className="mr-6">
              <RouterLink to="/" className="flex items-center space-x-2">
                <img 
                  src={logoUrl} 
                  alt={`${companyName} logo`} 
                  className="h-8 w-auto" 
                />
                <span className="font-bold text-xl tracking-tight">{companyName}</span>
              </RouterLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            {/* Using normal RouterLink components for navigation */}
            <RouterLink 
              to="/help" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </RouterLink>
            <RouterLink 
              to="/contact" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
