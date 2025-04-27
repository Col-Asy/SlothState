import { Timestamp } from "firebase-admin/firestore";

// backend/src/types.ts
export interface BaseEvent {
  timestamp: Timestamp;
  sessionId: string;
  url: string;
}

export interface ClickEvent extends BaseEvent {
  type: "click";
  element: {
    tagName: string;
    id?: string;
    className?: string;
    text?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface ScrollEvent extends BaseEvent {
  type: "scroll";
  scrollY: number;
  direction: "up" | "down" | null;
  scrollDepth?: number;
}

export interface SessionData {
  sessionId: string;
  createdAt: number;
}

export type UserEvent = ClickEvent | ScrollEvent;

export interface Insight {
  title: string;
  content: string;
  confidence: number;
  timestamp: Timestamp;
  integrationId: string;
  userId: string;
  analyticsId: string;
}

export interface DailyIssue {
  date: string;
  issues: Array<{
    issue: string;
    impact: "High" | "Medium" | "Low";
    confidence: number;
  }>;
  createdAt: Timestamp;
}
