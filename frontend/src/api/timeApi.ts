import type { TimeApiResponse } from "../types/index";

// Function to fetch current time based on latitude and longitude from the Time API
export async function fetchTime(
  latitude: number,
  longitude: number,
): Promise<TimeApiResponse> {
  const url = `https://timeapi.io/api/time/current/coordinate?latitude=${latitude}&longitude=${longitude}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Time fetch failed");
  return res.json();
}
