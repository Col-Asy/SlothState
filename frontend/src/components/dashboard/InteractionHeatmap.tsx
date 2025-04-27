import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Hand, ArrowDownUp, Monitor, Smartphone, Laptop } from "lucide-react";
import { db } from "@/utils/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { DateTimeFormatOptions } from "@/types/types";
import LoaderComponent from "../LoaderComponent";

type InteractionHeatmapProps = {
  integrationId: string;
  dateRange: string;
};

// Helper functions
const getStartDate = (dateRange: string) => {
  const now = new Date();
  const ranges = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };
  return new Date(now.getTime() - (ranges[dateRange] || 0));
};

const groupDataByTime = (events: any[], dateRange: string) => {
  const formatOptions: DateTimeFormatOptions =
    dateRange === "24h"
      ? { hour: "numeric" as const, hour12: false }
      : { month: "short" as const, day: "numeric" as const, hour12: false };

  return events.reduce((acc, event) => {
    // Handle Firestore Timestamp objects properly
    const timestamp =
      event.timestamp && event.timestamp.toDate
        ? event.timestamp.toDate()
        : new Date(event.timestamp);

    const date = timestamp.toLocaleString("en-US", formatOptions);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
};

export const InteractionHeatmap: React.FC<InteractionHeatmapProps> = ({
  integrationId,
  dateRange,
}) => {
  const { user } = useAuth();
  const [heatmapType, setHeatmapType] = useState("clicks");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Processed data for visualization
  const chartData = useMemo(() => {
    const grouped = groupDataByTime(events, dateRange);
    return Object.entries(grouped).map(([time, count]) => ({
      time,
      count,
    }));
  }, [events, dateRange]);

  // Fetch tracking events
  useEffect(() => {
    if (!user?.uid || !integrationId) {
      setEvents([]);
      return;
    }

    setLoading(true);
    const fetchEvents = async () => {
      try {
        const startDate = getStartDate(dateRange);
        const startTimestamp = Timestamp.fromDate(startDate); // Convert to Firestore Timestamp

        const eventsRef = collection(
          db,
          `users/${user.uid}/integrations/${integrationId}/tracking`
        );

        const q = query(
          eventsRef,
          where("timestamp", ">=", startTimestamp),
          where("type", "==", heatmapType === "clicks" ? "click" : "scroll"),
          ...(deviceFilter !== "all"
            ? [where("device", "==", deviceFilter)]
            : [])
        );

        console.log("Executing query:", q);
        const snapshot = await getDocs(q);
        console.log(
          "Query results:",
          snapshot.docs.map((doc) => doc.data())
        );

        setEvents(snapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error("Firestore fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user?.uid, integrationId, dateRange, heatmapType, deviceFilter]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Interaction Analysis</CardTitle>
            <CardDescription>
              User engagement patterns over time
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <ToggleGroup
              type="single"
              value={heatmapType}
              onValueChange={(value) => value && setHeatmapType(value)}
            >
              <ToggleGroupItem value="clicks" aria-label="Clicks">
                <Hand className="h-4 w-4 mr-2" />
                Clicks
              </ToggleGroupItem>
              <ToggleGroupItem value="scrolls" aria-label="Scrolls">
                <ArrowDownUp className="h-4 w-4 mr-2" />
                Scrolls
              </ToggleGroupItem>
            </ToggleGroup>

            <Select value={deviceFilter} onValueChange={setDeviceFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground flex flex-col items-center">
                <LoaderComponent />
                Loading data...
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">No interactions recorded</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="time"
                  tick={{ fill: "#6b7280" }}
                  stroke="#374151"
                />
                <YAxis tick={{ fill: "#6b7280" }} stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#e5e7eb" }}
                />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  label={{ fill: "#e5e7eb" }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>
            Total {heatmapType}: {events.length}
          </div>
          <div>
            {dateRange === "24h"
              ? "Last 24 hours"
              : dateRange === "7d"
              ? "Last 7 days"
              : "Last 30 days"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
