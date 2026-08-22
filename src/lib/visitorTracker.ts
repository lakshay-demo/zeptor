export type VisitorSession = {
  id: string;
  createdAt: string;
  lastSeen: string;
  page: string;
  totalViews: number;
};

const STORAGE_KEY = 'zeptorVisitorSessions';
const SESSION_KEY = 'zeptorVisitorSessionId';

const readSessions = (): VisitorSession[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as VisitorSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeSessions = (sessions: VisitorSession[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const getOrCreateSessionId = () => {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const generated = globalThis.crypto?.randomUUID?.() ?? `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  sessionStorage.setItem(SESSION_KEY, generated);
  return generated;
};

export const recordVisit = (page = '/') => {
  if (typeof window === 'undefined') {
    return { activeVisitors: 0, totalVisits: 0 };
  }

  const sessionId = getOrCreateSessionId();
  const now = new Date().toISOString();
  const sessions = readSessions();
  const existingIndex = sessions.findIndex((session) => session.id === sessionId);

  if (existingIndex >= 0) {
    const updated = [...sessions];
    updated[existingIndex] = {
      ...updated[existingIndex],
      lastSeen: now,
      page,
      totalViews: (updated[existingIndex].totalViews || 1) + 1,
    };
    writeSessions(updated);
  } else {
    const nextSession: VisitorSession = {
      id: sessionId,
      createdAt: now,
      lastSeen: now,
      page,
      totalViews: 1,
    };
    writeSessions([...sessions, nextSession]);
  }

  return {
    activeVisitors: getActiveVisitorCount(),
    totalVisits: getTotalVisitCount(),
  };
};

export const getActiveVisitorCount = (windowMinutes = 5) => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const cutoff = Date.now() - windowMinutes * 60 * 1000;
  return readSessions().filter((session) => new Date(session.lastSeen).getTime() > cutoff).length;
};

export const getTotalVisitCount = () => readSessions().length;

export const getVisitorSummary = () => ({
  activeVisitors: getActiveVisitorCount(),
  totalVisits: getTotalVisitCount(),
});
