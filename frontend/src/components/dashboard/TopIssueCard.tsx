import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface TopIssuesCardProps {
  integrationId: string;
}

export const TopIssuesCard = ({ integrationId }: TopIssuesCardProps) => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const fetchIssues = async (date = new Date()) => {
    if (!integrationId || !user?.uid) {
      setIssues([]);
      return;
    }

    setLoading(true);
    try {
      const dateString = date.toISOString().split("T")[0];
      const docRef = doc(
        db,
        `users/${user.uid}/integrations/${integrationId}/dailyIssues/${dateString}`
      );

      const snapshot = await getDoc(docRef);
      setIssues(snapshot.exists() ? snapshot.data()?.issues || [] : []);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [integrationId, user?.uid]);

  return (
    <Card className="w-auto">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Top Issues
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchIssues()}
            disabled={loading}
            className="ml-auto"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </CardTitle>
        <CardDescription>Priority issues from last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead className="text-right">Impact</TableHead>
              <TableHead className="text-right">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue, index) => (
              <TableRow key={index}>
                <TableCell>{issue.issue}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      issue.impact === "High"
                        ? "text-destructive"
                        : issue.impact === "Medium"
                        ? "text-amber-500"
                        : "text-muted-foreground"
                    }
                  >
                    {issue.impact}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {issue.confidence}%
                </TableCell>
              </TableRow>
            ))}
            {issues.length === 0 && !loading && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No issues recorded
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
