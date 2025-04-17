
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Star, Shield } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="order-form" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 rounded-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Start Optimizing Today
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your User Experience with SlothState</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
              Join innovative companies using SlothState to optimize their products and delight their users.
            </p>
          </div>
          
          {/* 3 Main Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/30 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BadgeCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-Time Analysis</h3>
                <p className="text-foreground/70">Identify UX issues as they happen, not after users abandon your product.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Star className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-foreground/70">Get actionable recommendations based on real user behavior patterns.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Shield className="h-10 w-10 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Privacy-First Design</h3>
                <p className="text-foreground/70">Complete control over data collection with end-to-end encryption.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
