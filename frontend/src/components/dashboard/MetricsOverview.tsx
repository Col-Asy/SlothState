import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Clock, Users, ArrowRight, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebase';
import { useAuth } from '@/context/AuthContext';

interface Metric {
  activeUsers: number;
  activeUsersChange: number;
  avgDuration: string;
  avgDurationChange: string;
  bounceRate: number;
  bounceRateChange: number;
  conversionRate: number;
  conversionRateChange: number;
}

export const MetricsOverview = ({ integrationId }: { integrationId: string }) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metric | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = async () => {
    if (!user?.uid || !integrationId) return;
    
    setLoading(true);
    try {
      const docRef = doc(
        db,
        `users/${user.uid}/integrations/${integrationId}/dailyMetrics/latest`
      );
      const snapshot = await getDoc(docRef);
      setMetrics(snapshot.exists() ? snapshot.data() as Metric : null);
    } finally {
      setLoading(false);
    }
  };

  // Add this useEffect to handle integration changes
  useEffect(() => {
    if (integrationId) {
      fetchMetrics();
    }
  }, [integrationId]);

  const handleRefresh = async () => {
    if (cooldown > 0) return;

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_BACKEND_URL}/api/generate-metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          integrationId,
          uid: user?.uid,
        }),
      });

      if (!response.ok) throw new Error("Refresh failed");

      localStorage.setItem("lastMetricsRefresh", Date.now().toString());
      setCooldown(86400000); // 24h cooldown
      await fetchMetrics();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastRefresh = localStorage.getItem("lastMetricsRefresh");
    if (lastRefresh) {
      const remaining = Math.max(
        0,
        86400000 - (Date.now() - parseInt(lastRefresh))
      );
      setCooldown(remaining);
    }
    fetchMetrics();
  }, [integrationId, user?.uid]);

  useEffect(() => {
    if (!cooldown) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!metrics) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Active Users Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Active Users</span>
            </div>
            {metrics.activeUsersChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{metrics.activeUsers}</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>
                {metrics.activeUsersChange >= 0 ? "+" : ""}
                {metrics.activeUsersChange}% from last week
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Average Duration Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Avg. Duration</span>
            </div>
            {metrics.avgDurationChange.startsWith("+") ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{metrics.avgDuration}</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>{metrics.avgDurationChange} from last week</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bounce Rate Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Bounce Rate</span>
            </div>
            {metrics.bounceRateChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">{metrics.bounceRate}%</span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>
                {metrics.bounceRateChange >= 0 ? "+" : ""}
                {metrics.bounceRateChange}% from last week
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Conversion Rate</span>
            </div>
            {metrics.conversionRateChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold">
              {metrics.conversionRate}%
            </span>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>
                {metrics.conversionRateChange >= 0 ? "+" : ""}
                {metrics.conversionRateChange}% from last week
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refresh Button */}
      <div className="col-span-full flex justify-end">
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={loading || cooldown > 0}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading
            ? "Generating..."
            : cooldown > 0
            ? `${Math.floor(cooldown / 3600000)}h ${Math.floor(
                (cooldown % 3600000) / 60000
              )}m left`
            : "Update Metrics"}
        </Button>
      </div>
    </div>
  );
};
