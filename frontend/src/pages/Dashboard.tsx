import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock,
  Loader2,
  Users,
  Video,
} from "lucide-react";
import { AnalyticsSummaryCard } from "@/components/dashboard/AnalyticsSummaryCard";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { SessionReplayCard } from "@/components/dashboard/SessionReplayCard";
import { InteractionHeatmap } from "@/components/dashboard/InteractionHeatmap";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { FrictionPointsCard } from "@/components/dashboard/FrictionPointsCard";
import { useProject } from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/utils/firebase/firebase";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Dashboard = () => {
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [currentIntegrationId, setCurrentIntegrationId] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("7d");

  // Overview tab
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Insights tab
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch summary for the current integration
  const fetchSummary = useCallback(async () => {
    if (!currentIntegrationId || !user?.uid) return;
  
    try {
      const analyticsRef = collection(
        db,
        `users/${user.uid}/integrations/${currentIntegrationId}/analytics`
      );
      const q = query(analyticsRef, orderBy("timestamp", "desc"), limit(1));
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        const latestAnalytics = snapshot.docs[0].data();
        setSummary(latestAnalytics.summary || null);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [currentIntegrationId, user?.uid]);

  // Refresh summary handler
  const handleRefreshSummary = async () => {
    setSummaryLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BACKEND_URL}/api/generate-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          integrationId: currentIntegrationId,
          uid: user?.uid
        })
      });
  
      if (!response.ok) throw new Error('Failed to generate summary');
      await fetchSummary();
    } catch (error) {
      console.error("Summary refresh error:", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Fetch integrations for the current user in real-time
  useEffect(() => {
    if (!user?.uid) return;
    const ref = collection(db, `users/${user.uid}/integrations`);
    const unsub = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIntegrations(data);

      // Auto-select first integration if none selected
      if (data.length > 0 && !currentIntegrationId) {
        setCurrentIntegrationId(data[0].id);
      }
      // Clear selection if all integrations are removed
      if (data.length === 0) {
        setCurrentIntegrationId("");
      }
    });
    return () => unsub();
    // eslint-disable-next-line
  }, [user?.uid]);

  // Fetch latest analytics ID and insights
  const fetchInsights = async () => {
    // console.log("[DEBUG] Starting insights fetch");
    try {
      // 1. Get latest analyticsId
      const analyticsRef = collection(
        db,
        `users/${user.uid}/integrations/${currentIntegrationId}/analytics`
      );
      const q = query(analyticsRef, orderBy("timestamp", "desc"), limit(1));
      // console.log("[DEBUG] Analytics query:", q);

      const analyticsSnapshot = await getDocs(q);
      // console.log("[DEBUG] Analytics snapshot:", analyticsSnapshot.docs);

      if (analyticsSnapshot.empty) {
        // console.log("[DEBUG] No analytics documents found");
        setInsights([]);
        return;
      }

      const analyticsId = analyticsSnapshot.docs[0].id;
      // console.log("[DEBUG] Latest analyticsId:", analyticsId);

      // 2. Fetch insights
      const insightsRef = collection(
        db,
        `users/${user.uid}/integrations/${currentIntegrationId}/analytics/${analyticsId}/insights`
      );
      // console.log("[DEBUG] Insights ref path:", insightsRef.path);

      const insightsSnapshot = await getDocs(insightsRef);
      // console.log("[DEBUG] Insights docs:", insightsSnapshot.docs);

      const insightsData = insightsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log("[DEBUG] Mapped insights:", insightsData);

      setInsights(insightsData);
    } catch (error) {
      // console.error("[DEBUG] Fetch error:", error);
      setError("Failed to load insights");
    }
  };

  // Initial load
  useEffect(() => {
    fetchSummary();
    fetchInsights();
  }, [fetchSummary, fetchInsights]);

  // Refresh handler
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BACKEND_URL}/api/generate-insights`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            integrationId: currentIntegrationId,
            dateRange: "7d",
            uid: user?.uid,
          }),
        }
      );

      if (!response.ok) throw new Error("Refresh failed");
      await fetchInsights(); // Reload after generation
    } catch (err) {
      setError("Failed to refresh insights");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show empty state if no integrations
  if (integrations.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-2xl font-bold">No Integrations Found</h1>
            <p className="text-muted-foreground">
              Get started by connecting your first website to track user
              interactions.
            </p>
            <Button asChild>
              <Link to="/dashboard/integrations">Add Integration</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const selectedIntegration = integrations.find(
    (i) => i.id === currentIntegrationId
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Integration Selector */}
        <div className="flex w-full justify-end items-end gap-4 mb-2">
          <Select
            value={currentIntegrationId}
            onValueChange={setCurrentIntegrationId}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select integration" />
            </SelectTrigger>
            <SelectContent>
              {integrations.map((integration) => (
                <SelectItem key={integration.id} value={integration.id}>
                  {integration.url
                    ? new URL(integration.url).hostname
                    : integration.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Show the selected integration ID at the top */}
        {/* {currentIntegrationId && (
          <div className="mb-4 text-muted-foreground">
            <span className="font-semibold">Active Integration ID:</span>{" "}
            {currentIntegrationId}
          </div>
        )} */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and analyze user interactions
            </p>
          </div>

          <ToggleGroup
            type="single"
            value={dateRange}
            onValueChange={(value) => value && setDateRange(value)}
          >
            <ToggleGroupItem value="24h">24h</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
            {/* <ToggleGroupItem value="custom">Custom</ToggleGroupItem> */}
          </ToggleGroup>
        </div>

        <MetricsOverview />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="sessions">Sessions</TabsTrigger> */}
            <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <AnalyticsSummaryCard
                summary={summary}
                loading={summaryLoading}
                onRefresh={handleRefreshSummary}
              />
              <FrictionPointsCard insights={insights} />
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

          {/* Session Replay Tab */}
          {/* <TabsContent value="sessions" className="space-y-6 mt-6">
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
          </TabsContent> */}

          {/* Heatmap Tab */}
          <TabsContent value="heatmaps" className="mt-6">
            <InteractionHeatmap
              integrationId={currentIntegrationId}
              dateRange={dateRange}
            />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>AI-Generated Insights</CardTitle>
                    <CardDescription>
                      Automated analysis of user behavior patterns
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isLoading}
                  >
                    {isLoading ? "Generating..." : "Refresh Insights"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : error ? (
                  <div className="text-center py-6 text-destructive">
                    {error}{" "}
                    <Button variant="ghost" onClick={fetchInsights}>
                      Retry
                    </Button>
                  </div>
                ) : insights.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No insights available. Click "Refresh Insights" to generate.
                  </div>
                ) : (
                  insights.map((insight) => (
                    <div
                      key={insight.id}
                      className="p-4 border rounded-lg bg-muted/50"
                    >
                      <h3 className="font-medium mb-2">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {insight.content}
                      </p>
                      <div className="mt-2 text-xs text-right text-muted-foreground">
                        Confidence: {insight.confidence}%
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
