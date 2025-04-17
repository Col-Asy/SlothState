
import React from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AnalyticsSummaryCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          AI Summary
        </CardTitle>
        <CardDescription>Current user behavior patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm">
            Based on the last 7 days of user data, we've detected several key patterns in user behavior:
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mobile users are spending 43% more time on product pages compared to last week, but conversion rates have only increased by 5%.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>The new checkout flow has reduced cart abandonment by 12%, with the largest improvement seen in the payment information step.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>User engagement with product videos has increased by 28%, suggesting that visual content is resonating well with your audience.</span>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Data collected from 8,247 user sessions</span>
          <span>Last updated: 12 minutes ago</span>
        </div>
      </CardContent>
    </Card>
  );
};
