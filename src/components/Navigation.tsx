
import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

interface NavigationProps {
  logoUrl?: string;
  companyName?: string;
}

const Navigation = ({ 
  logoUrl = "/placeholder.svg", 
  companyName = "ShipTrack" 
}: NavigationProps) => {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild className="mr-6">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={logoUrl} 
                  alt={`${companyName} logo`} 
                  className="h-8 w-auto" 
                />
                <span className="font-bold text-xl tracking-tight">{companyName}</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <Link 
              to="#" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </Link>
            <Link 
              to="#" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
