// backend/src/types.ts
export interface BaseEvent {
  timestamp: string;
  userId: string;
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

export type UserEvent = ClickEvent | ScrollEvent;
