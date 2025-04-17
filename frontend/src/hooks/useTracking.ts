import { useEffect, useRef } from "react";

const getOrCreateUserId = (): string => {
  let id = localStorage.getItem("tracking_user_id");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("tracking_user_id", id);
  }
  return id;
};

export const useTracking = () => {
  const eventBuffer = useRef<any[]>([]);
  const userId = useRef<string>(getOrCreateUserId());

  const trackEvent = (event: any) => {
    eventBuffer.current.push({
      ...event,
      userId: userId.current,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });
  };

  const sendBatch = async () => {
    if (eventBuffer.current.length === 0) return;
    const batch = [...eventBuffer.current];
    eventBuffer.current = [];
    try {
      await fetch("http://localhost:4000/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch),
      });
    } catch (error) {}
  };

  useEffect(() => {
    // Click tracking
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

    // Scroll tracking (throttled)
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

    // Batch sending interval
    const interval = setInterval(sendBatch, 5000);

    // Flush buffer on unload
    const handleUnload = () => {
      if (eventBuffer.current.length > 0) {
        navigator.sendBeacon(
          "http://localhost:4000/api/track",
          JSON.stringify(eventBuffer.current)
        );
        eventBuffer.current = [];
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
