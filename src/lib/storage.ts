import type { Challenge } from "@/types.ts";

const KEY = "challenges";

export function loadChallenges(): Challenge[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Challenge[];
    // basic sanitize
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChallenges(challenges: Challenge[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(challenges));
  } catch {
    // ignore quota errors silently
  }
}
