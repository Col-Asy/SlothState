
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How does ScreenPipe collect user interaction data?",
    answer: "ScreenPipe uses a lightweight JavaScript SDK that captures mouse movements, clicks, form interactions, and navigation patterns with minimal performance impact. All data collection is GDPR compliant and can be configured to your privacy requirements."
  },
  {
    question: "Can ScreenPipe integrate with my existing tools?",
    answer: "Yes, ScreenPipe offers seamless integration with popular analytics platforms, CRMs, and product management tools through our API. We provide ready-made connectors for tools like Google Analytics, Mixpanel, Segment, and more."
  },
  {
    question: "How quickly can I see results after implementation?",
    answer: "You can start seeing real-time user interaction data immediately after implementation. Our AI begins analyzing patterns and providing insights within 24-48 hours once it has collected sufficient data to establish baselines."
  },
  {
    question: "Is my users' data secure with ScreenPipe?",
    answer: "Absolutely. We employ end-to-end encryption, anonymize personal data by default, and follow strict data protection protocols. We're SOC2 compliant and offer data residency options for customers with specific regulatory requirements."
  },
  {
    question: "How does the onboarding assistant customize walkthroughs?",
    answer: "Our AI analyzes user behavior patterns to identify which features are most relevant to specific user segments. It then dynamically adjusts onboarding flows to highlight those features and provide contextual guidance when users appear to struggle."
  },
  {
    question: "Can I customize what data is collected from my users?",
    answer: "Yes, you have full control over what data is collected. You can configure ScreenPipe to ignore sensitive form fields, specific pages, or user segments. Our dashboard makes it easy to adjust these settings at any time."
  },
  {
    question: "What kind of performance impact will ScreenPipe have on my site?",
    answer: "ScreenPipe is designed to be extremely lightweight. The SDK is under 20KB gzipped and uses efficient batching and throttling techniques to ensure minimal performance impact (typically less than 1% increased load time)."
  }
];

const FAQSection = () => {
  return (
    <section id="faqs" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Common questions about ScreenPipe</h2>
          <p className="text-xl text-foreground/80">
            Everything you need to know about our platform and how it can transform your user experience.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg overflow-hidden bg-card/30">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline flex items-center">
                  <HelpCircle className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
