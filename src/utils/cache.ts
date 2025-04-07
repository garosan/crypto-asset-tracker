const CACHE_EXPIRY_MS = 1000 * 60 * 60;

export function getCachedData(key: string) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const { timestamp, data } = JSON.parse(item);
  const isExpired = Date.now() - timestamp > CACHE_EXPIRY_MS;

  return isExpired ? null : data;
}

export function setCachedData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}
