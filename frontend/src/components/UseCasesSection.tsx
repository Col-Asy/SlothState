
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Puzzle, FileSearch, Rocket, Users } from 'lucide-react';

const useCases = [
  {
    icon: <Puzzle className="h-10 w-10 text-blue-500" />,
    title: "UX Optimization",
    description: "Identify friction points and optimize user flows to increase conversion rates by up to 35%.",
    link: "#"
  },
  {
    icon: <FileSearch className="h-10 w-10 text-purple-500" />,
    title: "User Research",
    description: "Gain deep insights into how users actually interact with your product without scheduling testing sessions.",
    link: "#"
  },
  {
    icon: <Rocket className="h-10 w-10 text-pink-500" />,
    title: "Product Onboarding",
    description: "Create adaptive walkthroughs that adjust to user behavior and skill level, increasing feature adoption.",
    link: "#"
  },
  {
    icon: <Users className="h-10 w-10 text-amber-500" />,
    title: "Customer Support",
    description: "Provide contextual assistance when users struggle, reducing support tickets and improving satisfaction.",
    link: "#"
  }
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Use Cases
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform every aspect of your user experience</h2>
          <p className="text-xl text-foreground/80">
            See how businesses across industries leverage ScreenPipe to improve UX and drive business results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
              <CardHeader>
                <div className="mb-4">{useCase.icon}</div>
                <CardTitle>{useCase.title}</CardTitle>
                <CardDescription className="text-foreground/70">{useCase.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-primary to-accent"></div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto glass-card p-8 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">See ScreenPipe in action</h3>
            <p className="text-center text-lg mb-8 text-foreground/80">
              Watch how ScreenPipe can transform your understanding of user behavior and improve your product experience.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="px-8">
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full"></div>
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full"></div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-dots"></div>
    </section>
  );
};

export default UseCasesSection;
