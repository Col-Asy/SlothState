import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { UserEvent } from "./types";

const app = express();
const PORT = 4000;

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

// Start server
app.listen(PORT, () => {
  console.log(`Tracking server running at http://localhost:${PORT}`);
});

// Handle shutdown gracefully
process.on("SIGINT", () => {
  saveEvents();
  process.exit(0);
});
