import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/70 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-3 flex md:block flex-col justify-center items-center">
            <div className="flex items-center mb-4">
              <span className="text-lg font-bold">SlothState</span>
            </div>
            <p className="text-foreground/70 mb-4 max-w-xs text-center md:text-left">
              Transform user experience with real-time screen analytics and AI-powered optimization.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className='flex md:block flex-col justify-center items-center'>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="#features" className="text-foreground/70 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-foreground/70 hover:text-primary transition-colors">How It Works</a></li>
            </ul>
          </div>
          
          <div className='flex md:block flex-col justify-center items-center'>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Guides</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">API Reference</a></li>
              {/* <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Blog</a></li> */}
            </ul>
          </div>
          
          {/* <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div> */}
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">&copy; 2025 ScreenPipe. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
