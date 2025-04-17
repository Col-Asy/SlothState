
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MousePointer, Hand, ArrowDownUp, Monitor, Smartphone, Laptop } from 'lucide-react';

export const InteractionHeatmap = () => {
  const [heatmapType, setHeatmapType] = useState('clicks');
  const [deviceFilter, setDeviceFilter] = useState('all');
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Interaction Heatmap</CardTitle>
            <CardDescription>Visualize where users are interacting with your interface</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <ToggleGroup type="single" value={heatmapType} onValueChange={(value) => value && setHeatmapType(value)}>
              <ToggleGroupItem value="clicks" aria-label="Toggle clicks heatmap">
                <Hand className="h-4 w-4 mr-2" />
                Clicks
              </ToggleGroupItem>
              <ToggleGroupItem value="moves" aria-label="Toggle moves heatmap">
                <MousePointer className="h-4 w-4 mr-2" />
                Moves
              </ToggleGroupItem>
              <ToggleGroupItem value="scrolls" aria-label="Toggle scrolls heatmap">
                <ArrowDownUp className="h-4 w-4 mr-2" />
                Scrolls
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Select value={deviceFilter} onValueChange={setDeviceFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    All Devices
                  </div>
                </SelectItem>
                <SelectItem value="desktop">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </div>
                </SelectItem>
                <SelectItem value="tablet">
                  <div className="flex items-center">
                    <Laptop className="h-4 w-4 mr-2" />
                    Tablet
                  </div>
                </SelectItem>
                <SelectItem value="mobile">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-muted rounded-md overflow-hidden">
          <div className="aspect-[3/2] w-full">
            {/* Placeholder for website screenshot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Website screenshot placeholder</p>
            </div>
            
            {/* Heatmap overlay */}
            {heatmapType === 'clicks' && (
              <div className="absolute inset-0">
                <div className="absolute left-[30%] top-[20%] h-20 w-20 rounded-full bg-red-500/20 blur-xl"></div>
                <div className="absolute left-[35%] top-[22%] h-12 w-12 rounded-full bg-red-500/30 blur-lg"></div>
                <div className="absolute left-[70%] top-[40%] h-24 w-24 rounded-full bg-red-500/20 blur-xl"></div>
                <div className="absolute left-[68%] top-[42%] h-16 w-16 rounded-full bg-red-500/30 blur-lg"></div>
                <div className="absolute left-[50%] top-[80%] h-16 w-16 rounded-full bg-red-500/30 blur-xl"></div>
              </div>
            )}
            
            {heatmapType === 'moves' && (
              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/4 h-40 w-64 rounded-full bg-blue-500/10 blur-xl transform -translate-x-1/2"></div>
                <div className="absolute left-1/3 top-2/3 h-32 w-48 rounded-full bg-blue-500/15 blur-xl"></div>
                <div className="absolute right-1/4 top-1/2 h-24 w-48 rounded-full bg-blue-500/20 blur-xl"></div>
              </div>
            )}
            
            {heatmapType === 'scrolls' && (
              <div className="absolute inset-0">
                <div className="absolute left-[80%] top-0 h-full w-16 bg-gradient-to-b from-green-500/5 to-green-500/30 blur-sm"></div>
                <div className="absolute left-[20%] top-0 h-full w-12 bg-gradient-to-b from-green-500/5 to-green-500/20 blur-sm"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>Based on data from 3,427 user sessions</div>
          <div>Last 7 days</div>
        </div>
      </CardContent>
    </Card>
  );
};
