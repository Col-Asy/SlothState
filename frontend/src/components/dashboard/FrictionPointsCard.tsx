
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const FrictionPointsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Friction Points
        </CardTitle>
        <CardDescription>Critical issues detected in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 rounded-md bg-red-50 border border-red-200">
            <div className="w-1 h-full min-h-[2.5rem] bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium">Checkout Form Abandonment</div>
              <div className="text-sm text-muted-foreground mt-1">85% of users abandon the payment form after credit card validation errors</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">2.5 hours ago</span>
                <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High Impact</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 rounded-md bg-amber-50 border border-amber-200">
            <div className="w-1 h-full min-h-[2.5rem] bg-amber-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium">Navigation Confusion</div>
              <div className="text-sm text-muted-foreground mt-1">Multiple rage clicks detected on non-clickable header elements</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">8 hours ago</span>
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Medium Impact</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 rounded-md bg-blue-50 border border-blue-200">
            <div className="w-1 h-full min-h-[2.5rem] bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium">Mobile Form Fields</div>
              <div className="text-sm text-muted-foreground mt-1">Input fields too small on mobile, causing typing errors</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">19 hours ago</span>
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Low Impact</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
