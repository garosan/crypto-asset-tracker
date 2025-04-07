export const COINGECKO_BASE_URL = import.meta.env.VITE_COINGECKO_BASE_URL;

export async function fetchCryptoData(
  symbol: string,
  range: "7" | "30" | "365"
) {
  const idMap: Record<string, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    AVAX: "avalanche-2",
    AAVE: "aave",
  };

  const coinId = idMap[symbol.toUpperCase()];
  if (!coinId) throw new Error("Unsupported symbol");

  const url = `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${range}`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
