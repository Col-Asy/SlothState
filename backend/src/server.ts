// backend/src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { UserEvent } from "./types";
import { analyzeUserInteractions } from "./utils/groqClient";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Store events in memory for quick access
let events: UserEvent[] = [];

// Load existing events if file exists
const dataFilePath = path.join(__dirname, "../data/user-events.json");
try {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, "utf8");
    events = JSON.parse(data);
    console.log(`Loaded ${events.length} events from storage`);
  }
} catch (error) {
  console.error("Error loading events file:", error);
}

// Ensure data directory exists
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save events to file periodically
const saveEvents = () => {
  fs.writeFileSync(dataFilePath, JSON.stringify(events, null, 2));
  console.log(`Saved ${events.length} events to storage`);
};

// API Routes
app.post("/api/track", (req: Request, res: Response) => {
  // Check if we received an array (batch) or single event
  const eventData = req.body;
  const eventsToAdd = Array.isArray(eventData) ? eventData : [eventData];

  // Validate and add each event
  for (const event of eventsToAdd) {
    if (!event.type || !event.timestamp) {
      res.status(400).json({ error: "Invalid event data" });
      return;
    }
    events.push(event as UserEvent);
  }

  // Save events every 10 new entries
  if (events.length % 10 === 0) {
    saveEvents();
  }

  res.status(200).json({ success: true });
});

app.get("/api/export", (req: Request, res: Response) => {
  // Save before exporting to ensure latest data
  saveEvents();
  res.download(dataFilePath, "user-events.json");
});

// NEW: Analytics endpoints
app.get("/api/analytics", (req: Request, res: Response) => {
  try {
    // Filter events by time range if needed
    const timeRange = req.query.timeRange as string;
    const filteredEvents = filterEventsByTimeRange(events, timeRange);

    // Group events into sessions
    const sessions = groupEventsIntoSessions(filteredEvents);

    // Calculate basic metrics
    const metrics = calculateMetrics(filteredEvents, sessions);

    res.status(200).json({
      events: filteredEvents,
      sessions,
      metrics,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Failed to load analytics data" });
  }
});

// NEW: AI analysis endpoint
app.get("/api/insights", async (req: Request, res: Response) => {
  try {
    // Filter events if needed
    const timeRange = req.query.timeRange as string;
    const filteredEvents = filterEventsByTimeRange(events, timeRange);

    if (filteredEvents.length === 0) {
      res.status(400).json({ error: "No events found for analysis" });
      return; // Just return without a value
    }

    // Get AI-powered insights
    const insights = await analyzeUserInteractions(filteredEvents);

    res.status(200).json(insights);
  } catch (error) {
    console.error("Error analyzing with Groq:", error);
    res.status(500).json({ error: "Failed to analyze user data" });
  }
});

// Helper functions
function filterEventsByTimeRange(
  events: UserEvent[],
  timeRange?: string
): UserEvent[] {
  if (!timeRange) return events;

  const now = new Date();
  let cutoff = new Date();

  switch (timeRange) {
    case "1d":
      cutoff.setDate(now.getDate() - 1);
      break;
    case "7d":
      cutoff.setDate(now.getDate() - 7);
      break;
    case "30d":
      cutoff.setDate(now.getDate() - 30);
      break;
    default:
      return events;
  }

  return events.filter((event) => {
    const eventDate = new Date(event.timestamp);
    return eventDate >= cutoff;
  });
}

function groupEventsIntoSessions(events: UserEvent[]): any[] {
  // Group events by user ID
  const sessionsByUser: Record<string, UserEvent[][]> = {};

  events.forEach((event) => {
    const userId = event.userId;
    if (!sessionsByUser[userId]) {
      sessionsByUser[userId] = [];
    }

    // Check if we should start a new session (30 min gap)
    const currentSession =
      sessionsByUser[userId][sessionsByUser[userId].length - 1];
    if (!currentSession) {
      sessionsByUser[userId].push([event]);
      return;
    }

    const lastEvent = currentSession[currentSession.length - 1];
    const timeDiff =
      new Date(event.timestamp).getTime() -
      new Date(lastEvent.timestamp).getTime();

    // If more than 30 minutes gap, start new session
    if (timeDiff > 30 * 60 * 1000) {
      sessionsByUser[userId].push([event]);
    } else {
      currentSession.push(event);
    }
  });

  // Flatten sessions
  const sessions: any[] = [];
  Object.values(sessionsByUser).forEach((userSessions) => {
    userSessions.forEach((session) => {
      sessions.push({
        userId: session[0].userId,
        duration: calculateSessionDuration(session),
        eventCount: session.length,
        events: session,
      });
    });
  });

  return sessions;
}

function calculateSessionDuration(events: UserEvent[]): number {
  if (events.length < 2) return 0;

  const firstEvent = new Date(events[0].timestamp).getTime();
  const lastEvent = new Date(events[events.length - 1].timestamp).getTime();

  // Return duration in seconds
  return (lastEvent - firstEvent) / 1000;
}

function calculateMetrics(events: UserEvent[], sessions: any[]): any {
  // Basic interaction metrics
  const clickEvents = events.filter((e) => e.type === "click");
  const scrollEvents = events.filter((e) => e.type === "scroll");

  // Get unique users
  const uniqueUsers = new Set(events.map((e) => e.userId)).size;

  // Calculate average session duration
  const totalDuration = sessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const avgSessionDuration = sessions.length
    ? totalDuration / sessions.length
    : 0;

  return {
    totalEvents: events.length,
    uniqueUsers,
    sessionCount: sessions.length,
    avgSessionDuration,
    clickCount: clickEvents.length,
    scrollCount: scrollEvents.length,
    eventsPerSession: sessions.length ? events.length / sessions.length : 0,
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`Tracking server running at http://localhost:${PORT}`);
});

// Handle shutdown gracefully
process.on("SIGINT", () => {
  saveEvents();
  process.exit(0);
});
