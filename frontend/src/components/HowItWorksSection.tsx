
import React from 'react';
import { ArrowDown } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Capture",
    description: "Our lightweight SDK records user interactions, screen activity, and UI events with minimal performance impact.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    number: "02",
    title: "Stream",
    description: "Data flows through streaming platform for real-time processing and analysis.",
    color: "from-indigo-500 to-purple-600"
  },
  {
    number: "03",
    title: "Analyze",
    description: "Our AI engine identifies patterns, friction points, and opportunities for optimization.",
    color: "from-purple-500 to-pink-600"
  },
  {
    number: "04",
    title: "Optimize",
    description: "Generate personalized onboarding experiences and UI recommendations based on insights.",
    color: "from-pink-500 to-rose-600"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Streamlined process, powerful results</h2>
          <p className="text-xl text-foreground/80">
            Our end-to-end solution seamlessly integrates with your application to deliver actionable insights.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-4">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold shrink-0`}>
                  {step.number}
                </div>
                
                <div className="flex-1 glass-card p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="h-8 w-8 text-primary/30" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-8 rounded-full bg-background border border-border">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              From Raw Data to Actionable Insights
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
