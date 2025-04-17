
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const DashboardSettings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Settings</h1>
          <p className="text-muted-foreground">Configure your analytics preferences</p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection</CardTitle>
              <CardDescription>
                Control how user interaction data is collected and processed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="collect-clicks" className="flex flex-col space-y-1">
                  <span>Collect click data</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Record when and where users click on your website
                  </span>
                </Label>
                <Switch id="collect-clicks" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="collect-mouse" className="flex flex-col space-y-1">
                  <span>Track mouse movements</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Record cursor positions to generate movement heatmaps
                  </span>
                </Label>
                <Switch id="collect-mouse" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="collect-scroll" className="flex flex-col space-y-1">
                  <span>Track page scrolling</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Record how users scroll through your content
                  </span>
                </Label>
                <Switch id="collect-scroll" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="collect-form" className="flex flex-col space-y-1">
                  <span>Form interaction analytics</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Track how users interact with forms (no sensitive data is collected)
                  </span>
                </Label>
                <Switch id="collect-form" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Configure how AI analyzes your user interaction data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ai-behavior" className="flex flex-col space-y-1">
                  <span>Behavior pattern recognition</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Identify common user behavior patterns and journeys
                  </span>
                </Label>
                <Switch id="ai-behavior" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ai-suggestions" className="flex flex-col space-y-1">
                  <span>Generate UI improvement suggestions</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Get AI recommendations for improving your website's usability
                  </span>
                </Label>
                <Switch id="ai-suggestions" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ai-alerts" className="flex flex-col space-y-1">
                  <span>Automatic issue detection</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Get alerts when AI detects potential UX problems
                  </span>
                </Label>
                <Switch id="ai-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-email" className="flex flex-col space-y-1">
                  <span>Email notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Receive weekly reports and critical alerts via email
                  </span>
                </Label>
                <Switch id="notify-email" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-dashboard" className="flex flex-col space-y-1">
                  <span>Dashboard notifications</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Show notifications in the dashboard interface
                  </span>
                </Label>
                <Switch id="notify-dashboard" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
