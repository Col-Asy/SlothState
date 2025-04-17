import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <span className="text-lg font-bold">SlothState</span>
              </a>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#use-cases" className="text-foreground/80 hover:text-foreground transition-colors">Use Cases</a></li>
              <li><a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Get Started</Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            <a href="#features" className="block px-3 py-2 rounded-md text-foreground hover:bg-accent/10">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 rounded-md text-foreground hover:bg-accent/10">How It Works</a>
            <a href="#use-cases" className="block px-3 py-2 rounded-md text-foreground hover:bg-accent/10">Use Cases</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-foreground hover:bg-accent/10">Pricing</a>
            <div className="flex flex-col space-y-2 mt-4 px-3 py-2">
              <Button variant="outline" className="w-full">Login</Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
