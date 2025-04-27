// backend/src/utils/groqClient.ts
import { Groq } from "groq-sdk";
import * as dotenv from "dotenv";
import path from "path";

// Use absolute path to resolve .env file
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  debug: true, // Temporarily enable to verify loading
});

// Initialize Groq client
const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Type definitions for analysis results
export interface UIOptimizationSuggestion {
  area: string;
  issue: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

export interface UserBehaviorPattern {
  pattern: string;
  confidence: number;
  description: string;
}

export interface FrictionPoint {
  location: string;
  description: string;
  severity: number;
  recommendation: string;
}

export interface AnalysisResult {
  optimizations: UIOptimizationSuggestion[];
  behaviorPatterns: UserBehaviorPattern[];
  frictionPoints: FrictionPoint[];
}

/**
 * Analyzes user interactions with Groq AI
 * @param events Array of user interaction events
 * @returns Structured analysis of UI optimizations, behavior patterns, and friction points
 */
export async function analyzeUserInteractions(
  events: any[]
): Promise<AnalysisResult> {
  try {
    // Format events for analysis
    const formattedData = formatEventsForGroq(events);

    // Make request to Groq
    const completion = await groqClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a UX analysis expert. Analyze user interaction data and provide insights in JSON format with these sections:
          1. optimizations: Array of UI optimization suggestions with area, issue, suggestion, and priority
          2. behaviorPatterns: Array of identified user behavior patterns with pattern name, confidence score (0-1), and description
          3. frictionPoints: Array of friction points with location, description, severity (1-10), and recommendation`,
        },
        {
          role: "user",
          content: `Analyze this user interaction data and provide JSON output as specified:
          ${formattedData}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    // Parse the response
    const content = completion.choices[0].message.content;
    const result = JSON.parse(content || "{}");

    return {
      optimizations: result.optimizations || [],
      behaviorPatterns: result.behaviorPatterns || [],
      frictionPoints: result.frictionPoints || [],
    };
  } catch (error) {
    console.error("Error analyzing user data with Groq:", error);
    throw error;
  }
}

/**
 * Helper function to format events for Groq analysis
 */
function formatEventsForGroq(events: any[]): string {
  // Group by event types
  const scrollEvents = events.filter((e) => e.type === "scroll");
  const clickEvents = events.filter((e) => e.type === "click");

  // Calculate session duration
  const startTime = new Date(events[0]?.timestamp || new Date()).getTime();
  const endTime = new Date(
    events[events.length - 1]?.timestamp || new Date()
  ).getTime();
  const sessionDuration = (endTime - startTime) / 1000; // in seconds

  // Calculate scroll metrics
  const totalScrollDistance =
    scrollEvents.length > 0
      ? scrollEvents[scrollEvents.length - 1].scrollY - scrollEvents[0].scrollY
      : 0;
  const scrollSpeed = totalScrollDistance / (sessionDuration || 1);

  // Format click insights
  const clickInsights = clickEvents.map((click) => ({
    element: click.element.tagName,
    text: click.element.text,
    timestamp: click.timestamp,
  }));

  return JSON.stringify(
    {
      summary: {
        sessionDuration: `${sessionDuration.toFixed(2)} seconds`,
        eventCount: events.length,
        scrollCount: scrollEvents.length,
        clickCount: clickEvents.length,
        totalScrollDistance: `${totalScrollDistance.toFixed(0)}px`,
        avgScrollSpeed: `${scrollSpeed.toFixed(2)}px/s`,
      },
      scrollBehavior: {
        pattern: scrollEvents.map((e) => ({
          y: e.scrollY,
          direction: e.direction,
        })),
        rapidScrolling: scrollSpeed > 100, // Consider rapid if > 100px/s
      },
      clickBehavior: clickInsights,
      rawEvents: events.slice(0, 5), // Include just a few events as sample
    },
    null,
    2
  );
}

export function convertAnalysisToInsights(
  analysis: AnalysisResult
): Array<{ title: string; content: string; confidence: number }> {
  const insights = [];

  // Convert optimizations
  for (const opt of analysis.optimizations) {
    insights.push({
      title: `${opt.area} Optimization`,
      content: `Issue: ${opt.issue}\nSuggestion: ${opt.suggestion}`,
      confidence:
        opt.priority === "high" ? 90 : opt.priority === "medium" ? 75 : 60,
    });
  }

  // Convert behavior patterns
  for (const pattern of analysis.behaviorPatterns) {
    insights.push({
      title: `Behavior Pattern: ${pattern.pattern}`,
      content: pattern.description,
      confidence: Math.round(pattern.confidence * 100),
    });
  }

  // Convert friction points
  for (const friction of analysis.frictionPoints) {
    insights.push({
      title: `Friction Point: ${friction.location}`,
      content: `${friction.description}\nRecommendation: ${friction.recommendation}`,
      confidence: 100 - friction.severity * 10,
    });
  }

  return insights;
}
