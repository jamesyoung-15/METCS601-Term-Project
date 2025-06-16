import { useState, useEffect } from "react";
import type { TimeApiResponse } from "../types/index";
import { fetchTime } from "../api/timeApi";

export function useTime(lat: number, lon: number) {
  const [data, setData] = useState<TimeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTime(lat, lon)
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch(() => setError("Couldn't fetch time..."))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return { data, loading, error };
}
