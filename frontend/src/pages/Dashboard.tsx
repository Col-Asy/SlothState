import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, AlertTriangle, BarChart3, Clock, Users, Video } from 'lucide-react';
import { AnalyticsSummaryCard } from '@/components/dashboard/AnalyticsSummaryCard';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import { SessionReplayCard } from '@/components/dashboard/SessionReplayCard';
import { InteractionHeatmap } from '@/components/dashboard/InteractionHeatmap';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { FrictionPointsCard } from '@/components/dashboard/FrictionPointsCard';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<string>('7d');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze user interactions</p>
          </div>
          
          <ToggleGroup type="single" value={dateRange} onValueChange={(value) => value && setDateRange(value)}>
            <ToggleGroupItem value="24h">24h</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
            <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <MetricsOverview />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <AnalyticsSummaryCard />
              <FrictionPointsCard />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Trend Analysis
                  </CardTitle>
                  <CardDescription>User metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrendChart />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Top Issues
                  </CardTitle>
                  <CardDescription>By impact severity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Issue</TableHead>
                        <TableHead className="text-right">Impact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Form abandonment</TableCell>
                        <TableCell className="text-right">High</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rage clicks on header</TableCell>
                        <TableCell className="text-right">Medium</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Button visibility</TableCell>
                        <TableCell className="text-right">Medium</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Page load time</TableCell>
                        <TableCell className="text-right">Low</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sessions" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SessionReplayCard />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Sessions
                  </CardTitle>
                  <CardDescription>Latest user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>User 4829</TableCell>
                        <TableCell>3m 42s</TableCell>
                        <TableCell className="text-right">
                          <Video className="h-4 w-4 inline" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>User 2385</TableCell>
                        <TableCell>6m 18s</TableCell>
                        <TableCell className="text-right">
                          <Video className="h-4 w-4 inline" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>User 9173</TableCell>
                        <TableCell>1m 24s</TableCell>
                        <TableCell className="text-right">
                          <Video className="h-4 w-4 inline" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="heatmaps" className="mt-6">
            <InteractionHeatmap />
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Automated analysis of user behavior patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-2">Conversion Optimization</h3>
                  <p className="text-sm text-muted-foreground">Users are abandoning the checkout form at the payment method selection step. Consider simplifying this step or providing more payment options.</p>
                  <div className="mt-2 text-xs text-right text-muted-foreground">Confidence: 92%</div>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-2">Navigation Friction</h3>
                  <p className="text-sm text-muted-foreground">Multiple users are experiencing difficulty finding the product categories menu. Recommend making the menu more prominent on mobile devices.</p>
                  <div className="mt-2 text-xs text-right text-muted-foreground">Confidence: 87%</div>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-medium mb-2">Content Engagement</h3>
                  <p className="text-sm text-muted-foreground">Users spend significantly more time on pages with video content. Consider adding more video explanations to key product pages.</p>
                  <div className="mt-2 text-xs text-right text-muted-foreground">Confidence: 79%</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
