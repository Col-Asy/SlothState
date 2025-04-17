
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Video, Pause, Play, SkipBack, SkipForward, FastForward } from 'lucide-react';

export const SessionReplayCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(25);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Video className="h-5 w-5 mr-2" />
          Session Replay
        </CardTitle>
        <CardDescription>User ID: 4829 | 3m 42s</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative bg-muted aspect-video">
          {/* Placeholder for session replay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Session preview</p>
            </div>
          </div>
          
          {/* Mouse cursor indicator (simulated) */}
          <div className="absolute h-5 w-5 rounded-full border-2 border-primary left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          
          {/* Click indicator (simulated) */}
          <div className="absolute h-8 w-8 rounded-full bg-primary/30 animate-ping left-2/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="p-4">
          {/* Timeline */}
          <div className="mb-2">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              onValueChange={(values) => setProgress(values[0])}
              className="w-full"
            />
          </div>
          
          {/* Timeline markers */}
          <div className="relative w-full h-6 mb-2">
            <div className="absolute left-[25%] top-0 h-full flex flex-col items-center">
              <div className="h-2 w-1 bg-red-500"></div>
              <span className="text-xs text-muted-foreground">Error</span>
            </div>
            <div className="absolute left-[42%] top-0 h-full flex flex-col items-center">
              <div className="h-2 w-1 bg-yellow-500"></div>
              <span className="text-xs text-muted-foreground">Click</span>
            </div>
            <div className="absolute left-[60%] top-0 h-full flex flex-col items-center">
              <div className="h-2 w-1 bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">Form</span>
            </div>
            <div className="absolute left-[78%] top-0 h-full flex flex-col items-center">
              <div className="h-2 w-1 bg-green-500"></div>
              <span className="text-xs text-muted-foreground">Page</span>
            </div>
          </div>
          
          {/* Playback controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant={playbackSpeed === 1 ? "default" : "ghost"} 
                size="sm" 
                className="text-xs h-7"
                onClick={() => setPlaybackSpeed(1)}
              >
                1x
              </Button>
              <Button 
                variant={playbackSpeed === 2 ? "default" : "ghost"} 
                size="sm" 
                className="text-xs h-7"
                onClick={() => setPlaybackSpeed(2)}
              >
                2x
              </Button>
              <Button 
                variant={playbackSpeed === 4 ? "default" : "ghost"} 
                size="sm" 
                className="text-xs h-7"
                onClick={() => setPlaybackSpeed(4)}
              >
                4x
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
