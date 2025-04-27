// FrictionPointsCard.tsx
import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function getImpact(confidence: number) {
  if (confidence >= 80) return { label: "High Impact", color: "destructive" };
  if (confidence >= 60) return { label: "Medium Impact", color: "amber" };
  return { label: "Low Impact", color: "blue" };
}

export const FrictionPointsCard = ({ insights }: { insights: any[] }) => {
  // Filter for friction points, sort by confidence descending
  const frictionPoints = insights
    .filter((i) => i.title && i.title.startsWith("Friction Point"))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3); // Show top 3

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
          Friction Points
        </CardTitle>
        <CardDescription>
          Critical issues detected in the last 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {frictionPoints.length === 0 && (
            <div className="text-muted-foreground text-center py-4">
              No friction points detected in the last 24 hours.
            </div>
          )}
          {frictionPoints.map((fp) => {
            const impact = getImpact(fp.confidence);
            return (
              <div
                key={fp.id}
                className={`flex items-start space-x-3 p-3 rounded-md ${
                  impact.color === "destructive"
                    ? "bg-destructive/10 border border-destructive/20 dark:bg-destructive/20"
                    : impact.color === "amber"
                    ? "bg-amber-100/60 border border-amber-300 dark:bg-amber-900/30 dark:border-amber-800"
                    : "bg-muted border border-border"
                }`}
              >
                <div
                  className={`w-1 h-full min-h-[2.5rem] rounded-full ${
                    impact.color === "destructive"
                      ? "bg-destructive"
                      : impact.color === "amber"
                      ? "bg-amber-500"
                      : "bg-blue-400 dark:bg-blue-700"
                  }`}
                ></div>
                <div className="flex-1">
                  <div
                    className={`font-medium ${
                      impact.color === "destructive"
                        ? "text-destructive"
                        : impact.color === "amber"
                        ? "text-amber-700 dark:text-amber-300"
                        : "text-blue-700 dark:text-blue-200"
                    }`}
                  >
                    {fp.title.replace("Friction Point: ", "")}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {fp.content}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {fp.timestamp && fp.timestamp.toDate
                        ? timeAgo(fp.timestamp.toDate())
                        : ""}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        impact.color === "destructive"
                          ? "bg-destructive text-destructive-foreground"
                          : impact.color === "amber"
                          ? "bg-amber-200 text-amber-800 dark:bg-amber-600 dark:text-amber-50"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-50"
                      }`}
                    >
                      {impact.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper to format time ago
function timeAgo(date: Date) {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}
