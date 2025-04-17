
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  LineChart, 
  Zap, 
  Eye, 
  PanelRight, 
  Shield, 
  UserCog,
  Lightbulb
} from 'lucide-react';

const featuresList = [
  {
    icon: <Eye className="h-8 w-8 text-accent" />,
    title: "Screen Interaction Capture",
    description: "Capture user interactions, mouse movements, and form inputs with minimal performance impact.",
  },
  {
    icon: <LineChart className="h-8 w-8 text-accent" />,
    title: "Real-time Analytics",
    description: "Process and analyze user behavior as it happens through Fluvio's streaming platform.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
    title: "AI-Powered Insights",
    description: "Get actionable recommendations to optimize UI/UX and identify friction points.",
  },
  {
    icon: <UserCog className="h-8 w-8 text-indigo-500" />,
    title: "Personalized Onboarding",
    description: "Create adaptive walkthroughs based on user behavior and interaction patterns.",
  },
  {
    icon: <PanelRight className="h-8 w-8 text-purple-500" />,
    title: "Contextual Assistance",
    description: "Offer real-time help and guidance when users struggle with specific features.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Privacy-First Design",
    description: "End-to-end encryption and customizable data collection settings to protect user privacy.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything you need to optimize user experience</h2>
          <p className="text-xl text-foreground/80">
            Our comprehensive toolkit helps you understand user behavior, identify pain points, and create personalized experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <Card key={index} className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-accent/50 transition-colors duration-300">
              <div className="p-6 relative">
                <div className="mb-4 relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
                <p className="text-foreground/70 relative z-10">{feature.description}</p>
                
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-radial from-accent/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;
