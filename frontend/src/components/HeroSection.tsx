import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MousePointer, Activity, MonitorSmartphone, Lightbulb } from 'lucide-react';

const HeroSection = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
      if (cursorDot) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="cursor-dot hidden md:block"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hero-glow"></div>
      <div className="absolute inset-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="text-gradient">Transform User Experience</span>
            <br />With Real-Time Screen Analysis
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Capture, analyze, and optimize user interactions to create personalized, frictionless experiences that drive engagement and conversion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="px-8">
              Start Using
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/20 relative">
            <div className="absolute inset-0 bg-dots bg-gradient-radial from-background/50 via-background/80 to-background"></div>
            
            {/* Visualization of the app interface */}
            <div className="absolute inset-0 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="glass-card px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">SlothState Analytics</p>
                </div>
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="h-3 w-3 rounded-full bg-accent animate-pulse-slow"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 h-full">
                {/* Left panel */}
                <div className="col-span-3 glass-card p-4 rounded-lg flex flex-col">
                  <div className="flex items-center space-x-2 mb-4">
                    <Activity className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium">Live Sessions</span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-background/50 p-2 rounded flex items-center justify-between">
                        <div className="h-2 w-16 bg-foreground/20 rounded-full"></div>
                        <div className="h-2 w-6 bg-accent/60 rounded-full animate-pulse-slow"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Main area */}
                <div className="col-span-9 flex flex-col space-y-4">
                  {/* Header */}
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2 items-center">
                        <MonitorSmartphone className="h-4 w-4 text-accent" />
                        <span className="text-xs font-medium">User Session #1392</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-12 bg-green-500/70 rounded-full"></div>
                        <span className="text-xs">Live</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="glass-card p-4 rounded-lg flex-1 relative">
                    {/* Screen visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-background/30 rounded-lg border border-white/10 relative overflow-hidden">
                        {/* Browser mockup */}
                        <div className="h-6 bg-background/50 flex items-center px-2">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-red-500/70"></div>
                            <div className="h-2 w-2 rounded-full bg-yellow-500/70"></div>
                            <div className="h-2 w-2 rounded-full bg-green-500/70"></div>
                          </div>
                          <div className="h-3 w-32 mx-auto bg-foreground/20 rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-12 gap-2 p-2 h-[calc(100%-1.5rem)]">
                          <div className="col-span-4 bg-foreground/10 rounded-sm"></div>
                          <div className="col-span-8">
                            <div className="h-4 mb-2 w-3/4 bg-foreground/10 rounded-sm"></div>
                            <div className="space-y-1 mb-2">
                              <div className="h-2 bg-foreground/10 rounded-sm"></div>
                              <div className="h-2 bg-foreground/10 rounded-sm"></div>
                              <div className="h-2 w-1/2 bg-foreground/10 rounded-sm"></div>
                            </div>
                            <div className="h-6 w-1/3 bg-accent/20 rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* Cursor and heatmap visualization */}
                        <div className="absolute top-1/2 left-1/2 h-4 w-4 -ml-2 -mt-2">
                          <MousePointer className="h-4 w-4 text-accent animate-pulse" />
                        </div>
                        <div className="absolute bottom-1/4 right-1/3 h-8 w-8 bg-accent/20 rounded-full animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Insights row */}
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium">AI Insights</span>
                    </div>
                    <div className="flex justify-between space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex-1 bg-background/40 p-2 rounded">
                          <div className="h-2 w-16 bg-foreground/20 mb-2 rounded-full"></div>
                          <div className="h-2 w-full bg-foreground/10 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 bg-accent/90 text-white p-3 rounded-lg shadow-lg animate-float">
            <div className="text-xs font-medium">UI Friction Detected</div>
            <div className="text-xs opacity-80">Recommend: Simplify checkout</div>
          </div>
          
          <div className="absolute -bottom-4 -left-6 glass-card p-3 rounded-lg shadow-lg animate-float">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium">Conversion Rate +23%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
