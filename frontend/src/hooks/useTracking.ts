// frontend/src/hooks/useTracking.ts
import { useEffect, useRef } from "react";
import { getOrCreateSessionId } from "@/utils/session";

export const useTracking = () => {
  const eventBuffer = useRef<any[]>([]);
  const sessionId = getOrCreateSessionId();

  const trackEvent = (event: any) => {
    eventBuffer.current.push({
      ...event,
      sessionId: sessionId,
      timestamp: Date.now(),
      url: window.location.href,
    });

    // To check if the event is being tracked correctly
    console.log("Tracked event:", event);
  };

  const sendBatch = async () => {
    if (eventBuffer.current.length === 0) return;
    const batch = [...eventBuffer.current];
    eventBuffer.current = [];
    
    // To check if the batch is being sent correctly
    console.log(batch.length, "events sent to server");
    
    try {
      await fetch(`${import.meta.env.VITE_SERVER_BACKEND_URL}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch),
      });

      // To check if the batch is being sent correctly
      console.log("Batch sent successfully:", batch.length);

    } catch (error) {}
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      trackEvent({
        type: "click",
        element: {
          tagName: target.tagName,
          id: target.id || undefined,
          className: target.className || undefined,
          text: target.textContent?.slice(0, 50) || undefined,
        },
        position: { x: e.clientX, y: e.clientY },
      });
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY) > 50) {
        trackEvent({
          type: "scroll",
          scrollY: currentY,
          direction: currentY > lastScrollY ? "down" : "up",
        });
        lastScrollY = currentY;
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(sendBatch, 5000);
    const handleUnload = () => {
      if (eventBuffer.current.length > 0) {
        navigator.sendBeacon(
          `${import.meta.env.VITE_SERVER_BACKEND_URL}/api/track`,
          JSON.stringify(eventBuffer.current)
        );
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
};
