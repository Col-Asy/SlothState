// backend/src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { SessionData, UserEvent } from "./types";
import {
  analyzeUserInteractions,
  convertAnalysisToInsights,
  generateAISummary,
} from "./utils/groqClient";
import admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// Your Groq analysis function and converter
import * as dotenv from "dotenv";

// Use absolute path to resolve .env file
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  debug: true, // Temporarily enable to verify loading
});

const app = express();
const PORT = process.env.PORT;

const serviceAccount = {
  type: process.env.FIREBASE_TYPE!,
  project_id: process.env.FIREBASE_PROJECT_ID!,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
  private_key: process.env.FIREBASE_PRIVATE_KEY!?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL!,
  client_id: process.env.FIREBASE_CLIENT_ID!,
  auth_uri: process.env.FIREBASE_AUTH_URI!,
  token_uri: process.env.FIREBASE_TOKEN_URI!,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL!,
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const db = admin.firestore();

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
// backend/src/server.ts
app.post("/api/track", async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const eventsToAdd = Array.isArray(eventData) ? eventData : [eventData];
    const processedEvents: string[] = [];
    const errors: any[] = [];

    console.log(`\n=== Received ${eventsToAdd.length} events ===`);

    for (const [index, event] of eventsToAdd.entries()) {
      try {
        console.log(`\nProcessing event ${index + 1}/${eventsToAdd.length}`);
        console.log("Raw event data:", JSON.stringify(event, null, 2));

        // Validate required fields
        if (!event.url) {
          throw new Error("Missing URL in event");
        }

        // Normalize URL
        const normalizedUrl = normalizeUrl(event.url);
        console.log(`Normalized URL: ${normalizedUrl}`);

        // Check integration exists
        console.log("Checking integrations...");
        const integrationSnapshot = await db
          .collectionGroup("integrations")
          .where("url", "==", normalizedUrl)
          .where("status", "==", true)
          .limit(1)
          .get();

        if (integrationSnapshot.empty) {
          throw new Error(`No active integration for: ${normalizedUrl}`);
        }

        const integrationDoc = integrationSnapshot.docs[0];
        const pathSegments = integrationDoc.ref.path.split("/");
        const userId = pathSegments[1];
        const integrationId = pathSegments[3];
        console.log(
          `Found integration: user=${userId}, integration=${integrationId}`
        );

        // ================= Timestamp Handling =================
        console.log("\nProcessing timestamp:");
        console.log("Original timestamp:", event.timestamp);
        console.log("Original type:", typeof event.timestamp);

        let timestampMillis: number;

        // Handle numeric types (including strings that are numbers)
        if (!isNaN(event.timestamp)) {
          timestampMillis = Number(event.timestamp);
          console.log("Converted numeric timestamp (ms):", timestampMillis);
        }
        // Handle ISO strings
        else if (typeof event.timestamp === "string") {
          timestampMillis = new Date(event.timestamp).getTime();
          console.log("Converted ISO timestamp (ms):", timestampMillis);
        }
        // Handle Date objects (unlikely from HTTP request)
        else if (event.timestamp instanceof Date) {
          timestampMillis = event.timestamp.getTime();
          console.log("Converted Date timestamp (ms):", timestampMillis);
        } else {
          throw new Error(
            `Unsupported timestamp type: ${typeof event.timestamp}`
          );
        }

        // Final validation
        if (isNaN(timestampMillis)) {
          throw new Error(`Invalid timestamp value: ${event.timestamp}`);
        }

        // Check if timestamp is in seconds (common mistake)
        if (timestampMillis < 1_000_000_000_000) {
          // Before 2001-09-09
          console.warn(
            "Timestamp might be in seconds - converting to milliseconds"
          );
          timestampMillis *= 1000;
        }

        const eventTimestamp = Timestamp.fromMillis(timestampMillis);
        console.log("Firestore timestamp:", eventTimestamp.toDate());
        console.log("Firestore seconds:", eventTimestamp.seconds);
        console.log("Firestore nanoseconds:", eventTimestamp.nanoseconds);

        // ================= Firestore Write =================
        console.log("Writing to tracking collection...");
        const trackingRef = db
          .collection(`users/${userId}/integrations/${integrationId}/tracking`)
          .doc();

        await trackingRef.set({
          ...event,
          timestamp: eventTimestamp,
          processedAt: Timestamp.now(),
          normalizedUrl,
          userId,
          integrationId,
        });

        console.log(`Document written with ID: ${trackingRef.id}`);
        processedEvents.push(trackingRef.id);
      } catch (error) {
        let errorMsg: string;
        if (error instanceof Error) {
          errorMsg = `Event ${index + 1} failed: ${error.message}`;
        } else {
          errorMsg = `Event ${index + 1} failed: ${String(error)}`;
        }
        console.error(errorMsg);
        errors.push({
          eventIndex: index + 1,
          error: errorMsg,
          rawEvent: event,
        });
      }
    }

    // Return detailed response
    return res.status(200).json({
      success: errors.length === 0,
      processed: processedEvents.length,
      failed: errors.length,
      errors,
    });
  } catch (error) {
    let errorMsg: string;
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = String(error);
    }
    console.error("Tracking error:", errorMsg);
    return res
      .status(500)
      .json({ error: "Internal server error", details: errorMsg });
  }
});

app.get("/api/export", (req: Request, res: Response) => {
  // Save before exporting to ensure latest data
  saveEvents();
  res.download(dataFilePath, "user-events.json");
});

app.post("/api/generate-insights", async (req: Request, res: Response) => {
  try {
    const { integrationId, dateRange, uid } = req.body;
    const userId = uid;

    // 1. Fetch tracking data
    const startDate = getStartDate(dateRange);
    const trackingRef = db.collection(
      `users/${userId}/integrations/${integrationId}/tracking`
    );

    const snapshot = await trackingRef
      .where("timestamp", ">=", admin.firestore.Timestamp.fromDate(startDate))
      .get();

    const events = snapshot.docs.map((doc) => doc.data());

    // 2. Generate insights
    const analysis = await analyzeUserInteractions(events);
    const insightsData = convertAnalysisToInsights(analysis);

    // 3. Create parent analytics document
    const analyticsId = admin.firestore.Timestamp.now().toMillis().toString();
    const analyticsRef = db.collection(
      `users/${userId}/integrations/${integrationId}/analytics`
    );

    // Create the parent document first
    await analyticsRef.doc(analyticsId).set({
      timestamp: admin.firestore.Timestamp.now(),
      integrationId,
      userId,
    });

    // 4. Batch write insights
    const insightsRef = analyticsRef.doc(analyticsId).collection("insights");
    const batch = db.batch();

    insightsData.forEach((insight) => {
      const docRef = insightsRef.doc();
      batch.set(docRef, {
        ...insight,
        timestamp: admin.firestore.Timestamp.now(),
        integrationId,
        userId,
        analyticsId,
      });
    });

    await batch.commit();

    res.status(200).json({
      success: true,
      analyticsId,
      count: insightsData.length,
    });
  } catch (error) {
    console.error("Insights generation error:", error);
    res.status(500).json({
      error: "Failed to generate insights",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/api/generate-summary", async (req: Request, res: Response) => {
  try {
    const { integrationId, uid: userId } = req.body;

    // 1. Get latest analytics data
    const analyticsRef = db.collection(
      `users/${userId}/integrations/${integrationId}/analytics`
    );
    const snapshot = await analyticsRef
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      res.status(404).json({ error: "No analytics data found" });
    }

    const latestAnalytics = snapshot.docs[0];
    const insightsRef = latestAnalytics.ref.collection("insights");
    const insightsSnapshot = await insightsRef.get();
    const insights = insightsSnapshot.docs.map((doc) => doc.data());

    // 2. Generate summary with Groq
    const summary = await generateAISummary(insights);

    // 3. Update analytics document with summary
    await latestAnalytics.ref.update({ summary });

    res.json({ success: true });
  } catch (error) {
    console.error("Summary generation error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// // NEW: Analytics endpoints
// app.get("/api/analytics", (req: Request, res: Response) => {
//   try {
//     const timeRange = req.query.timeRange as string;
//     const filteredEvents = filterEventsByTimeRange(events, timeRange);

//     // Group events by session
//     const sessions = groupEventsBySession(filteredEvents);

//     // Calculate session metrics
//     const sessionMetrics = Object.entries(sessions).map(
//       ([sessionId, events]) => ({
//         sessionId,
//         duration: calculateSessionDuration(events),
//         eventCount: events.length,
//         firstEvent: events[0].timestamp,
//         lastEvent: events[events.length - 1].timestamp,
//       })
//     );

//     res.status(200).json({
//       totalSessions: sessionMetrics.length,
//       averageSessionDuration:
//         sessionMetrics.reduce((sum, m) => sum + m.duration, 0) /
//         sessionMetrics.length,
//       sessions: sessionMetrics,
//     });
//   } catch (error) {
//     console.error("Error fetching analytics data:", error);
//     res.status(500).json({ error: "Failed to load analytics data" });
//   }
// });

// // NEW: AI analysis endpoint
// app.get("/api/insights", async (req: Request, res: Response) => {
//   try {
//     // Filter events if needed
//     const timeRange = req.query.timeRange as string;
//     const filteredEvents = filterEventsByTimeRange(events, timeRange);

//     if (filteredEvents.length === 0) {
//       res.status(400).json({ error: "No events found for analysis" });
//       return; // Just return without a value
//     }

//     // Get AI-powered insights
//     const insights = await analyzeUserInteractions(filteredEvents);

//     res.status(200).json(insights);
//   } catch (error) {
//     console.error("Error analyzing with Groq:", error);
//     res.status(500).json({ error: "Failed to analyze user data" });
//   }
// });

// Helper functions
// function filterEventsByTimeRange(
//   events: UserEvent[],
//   timeRange?: string
// ): UserEvent[] {
//   if (!timeRange) return events;

//   const now = new Date();
//   let cutoff = new Date();

//   switch (timeRange) {
//     case "1d":
//       cutoff.setDate(now.getDate() - 1);
//       break;
//     case "7d":
//       cutoff.setDate(now.getDate() - 7);
//       break;
//     case "30d":
//       cutoff.setDate(now.getDate() - 30);
//       break;
//     default:
//       return events;
//   }

//   return events.filter((event) => {
//     const eventDate = new Date(event.timestamp);
//     return eventDate >= cutoff;
//   });
// }

// function calculateSessionDuration(events: UserEvent[]): number {
//   if (events.length < 2) return 0;

//   const firstEvent = new Date(events[0].timestamp).getTime();
//   const lastEvent = new Date(events[events.length - 1].timestamp).getTime();

//   // Return duration in seconds
//   return (lastEvent - firstEvent) / 1000;
// }

// function groupEventsBySession(
//   events: UserEvent[]
// ): Record<string, UserEvent[]> {
//   const sessions: Record<string, UserEvent[]> = {};
//   for (const event of events) {
//     if (!sessions[event.sessionId]) sessions[event.sessionId] = [];
//     sessions[event.sessionId].push(event);
//   }
//   return sessions;
// }

function normalizeUrl(url: string) {
  try {
    const u = new URL(url);
    // Ensures trailing slash for root paths
    let normalized = u.origin + u.pathname;
    if (!normalized.endsWith("/")) normalized += "/";
    return normalized;
  } catch (e) {
    console.log("Error normalizing URL:", url, e);
    return url;
  }
}

function getStartDate(dateRange: string): Date {
  const now = new Date();
  switch (dateRange) {
    case "24h":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
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
