// backend/src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { SessionData, UserEvent } from "./types";
import { analyzeUserInteractions } from "./utils/groqClient";

const app = express();
const PORT = process.env.PORT;
const SESSION_LIFETIME = 24 * 60 * 60 * 1000;

// Middleware
app.use(cors()); // Allow CORS for all origins - good for development

// CORS configuration for production
// const corsOptions = {
//   origin: ["http://localhost:8080", "https://your-production-frontend.com"],
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

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

const isValidSessionId = (sessionId: string): boolean => {
  // Session ID format: {timestamp}-{random 32 hex chars}
  const SESSION_LIFETIME = 24 * 60 * 60 * 1000; // 24 hours

  const parts = sessionId.split("-");
  if (parts.length !== 2) return false;

  const [timestampStr, randomPart] = parts;

  // Validate timestamp
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration
  if (Date.now() - timestamp > SESSION_LIFETIME) return false;

  // Validate random part format
  return /^[a-f0-9]{32}$/.test(randomPart);
};

// API Routes
// Update the route handler with proper typing
// @ts-ignore
app.post("/api/track", (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const eventsToAdd = Array.isArray(eventData) ? eventData : [eventData];

    for (const event of eventsToAdd) {
      // Check if sessionId exists and is a string
      if (typeof event.sessionId !== "string") {
        return res.status(400).json({ error: "Missing session ID" });
      }

      // Validate session ID format and expiration
      if (!isValidSessionId(event.sessionId)) {
        return res.status(400).json({ error: "Invalid session ID" });
      }

      if (!event.type || !event.timestamp) {
        return res.status(400).json({ error: "Invalid event data" });
      }
    }

    // All events valid - add to storage
    events.push(...(eventsToAdd as UserEvent[]));

    if (events.length % 10 === 0) {
      saveEvents();
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/export", (req: Request, res: Response) => {
  // Save before exporting to ensure latest data
  saveEvents();
  res.download(dataFilePath, "user-events.json");
});

// NEW: Analytics endpoints
app.get("/api/analytics", (req: Request, res: Response) => {
  try {
    const timeRange = req.query.timeRange as string;
    const filteredEvents = filterEventsByTimeRange(events, timeRange);

    // Group events by session
    const sessions = groupEventsBySession(filteredEvents);

    // Calculate session metrics
    const sessionMetrics = Object.entries(sessions).map(
      ([sessionId, events]) => ({
        sessionId,
        duration: calculateSessionDuration(events),
        eventCount: events.length,
        firstEvent: events[0].timestamp,
        lastEvent: events[events.length - 1].timestamp,
      })
    );

    res.status(200).json({
      totalSessions: sessionMetrics.length,
      averageSessionDuration:
        sessionMetrics.reduce((sum, m) => sum + m.duration, 0) /
        sessionMetrics.length,
      sessions: sessionMetrics,
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

function calculateSessionDuration(events: UserEvent[]): number {
  if (events.length < 2) return 0;

  const firstEvent = new Date(events[0].timestamp).getTime();
  const lastEvent = new Date(events[events.length - 1].timestamp).getTime();

  // Return duration in seconds
  return (lastEvent - firstEvent) / 1000;
}

function groupEventsBySession(
  events: UserEvent[]
): Record<string, UserEvent[]> {
  const sessions: Record<string, UserEvent[]> = {};
  for (const event of events) {
    if (!sessions[event.sessionId]) sessions[event.sessionId] = [];
    sessions[event.sessionId].push(event);
  }
  return sessions;
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
