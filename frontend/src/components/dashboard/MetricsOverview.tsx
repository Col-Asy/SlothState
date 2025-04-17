
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Clock, Users, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

export const MetricsOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Active Users</span>
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">1,294</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>+14% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Avg. Duration</span>
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">4m 32s</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>+1m 12s from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Bounce Rate</span>
            </div>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">42.1%</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>-3.2% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Conversion Rate</span>
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">8.7%</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>+1.3% from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
