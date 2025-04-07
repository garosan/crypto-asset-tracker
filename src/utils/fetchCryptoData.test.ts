import { fetchCryptoData } from "./fetchCryptoData";

test("fetchCryptoData returns CoinGecko price data for BTC", async () => {
  const data = await fetchCryptoData("BTC", "7");
  expect(data).toHaveProperty("prices");
  expect(Array.isArray(data.prices)).toBe(true);
});
