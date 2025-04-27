import React from "react";
import { Brain, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

export const AnalyticsSummaryCard = ({
  summary,
  loading,
  onRefresh,
}: {
  summary?: string;
  loading: boolean;
  onRefresh: () => void;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            <CardTitle>AI Summary</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Generating..." : "Refresh"}
          </Button>
        </div>
        <CardDescription>Current user behavior patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary ? (
          <>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm whitespace-pre-wrap">
                <ReactMarkdown>
                  {summary}
                </ReactMarkdown>
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>AI-generated summary based on recent analytics</span>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No summary available. Click Refresh to generate.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
