// src/utils/session.ts
export function getOrCreateSessionId(): string {
  const SESSION_LIFETIME = 24 * 60 * 60 * 1000; // 24 hours
  const storageKey = "session_data";

  // Try to load existing session
  const existingSession = sessionStorage.getItem(storageKey);
  if (existingSession) {
    try {
      const { sessionId, timestamp } = JSON.parse(existingSession);
      if (Date.now() - timestamp < SESSION_LIFETIME) {
        return sessionId;
      }
    } catch (e) {
      // Invalid session data, continue to create new
    }
  }

  // Generate new session ID with timestamp
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  const randomPart = Array.from(array, (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
  const timestamp = Date.now();
  const sessionId = `${timestamp}-${randomPart}`;

  // Store session data
  sessionStorage.setItem(
    storageKey,
    JSON.stringify({
      sessionId,
      timestamp,
    })
  );

  return sessionId;
}
