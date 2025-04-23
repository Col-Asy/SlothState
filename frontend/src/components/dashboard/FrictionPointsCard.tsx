import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FrictionPointsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
          Friction Points
        </CardTitle>
        <CardDescription>Critical issues detected in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* High Impact */}
          <div className="flex items-start space-x-3 p-3 rounded-md bg-destructive/10 border border-destructive/20 dark:bg-destructive/20">
            <div className="w-1 h-full min-h-[2.5rem] bg-destructive rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-destructive">Checkout Form Abandonment</div>
              <div className="text-sm text-muted-foreground mt-1">85% of users abandon the payment form after credit card validation errors</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">2.5 hours ago</span>
                <span className="text-xs font-semibold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">High Impact</span>
              </div>
            </div>
          </div>
          {/* Medium Impact (Warning/Amber) */}
          <div className="flex items-start space-x-3 p-3 rounded-md bg-amber-100/60 border border-amber-300 dark:bg-amber-900/30 dark:border-amber-800">
            <div className="w-1 h-full min-h-[2.5rem] bg-amber-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-amber-700 dark:text-amber-300">Navigation Confusion</div>
              <div className="text-sm text-muted-foreground mt-1">Multiple rage clicks detected on non-clickable header elements</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">8 hours ago</span>
                <span className="text-xs font-semibold bg-amber-200 text-amber-800 dark:bg-amber-600 dark:text-amber-50 px-2 py-0.5 rounded-full">Medium Impact</span>
              </div>
            </div>
          </div>
          {/* Low Impact (Info) */}
          <div className="flex items-start space-x-3 p-3 rounded-md bg-muted border border-border">
            <div className="w-1 h-full min-h-[2.5rem] bg-blue-400 dark:bg-blue-700 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-blue-700 dark:text-blue-200">Mobile Form Fields</div>
              <div className="text-sm text-muted-foreground mt-1">Input fields too small on mobile, causing typing errors</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">19 hours ago</span>
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-50 px-2 py-0.5 rounded-full">Low Impact</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
