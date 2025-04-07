import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoData } from "../../utils/fetchCryptoData";
import { getCachedData, setCachedData } from "../../utils/cache";

type Range = "7" | "30" | "365";

interface CryptoState {
  symbol: string;
  range: Range;
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CryptoState = {
  symbol: "BTC",
  range: "7",
  data: null,
  status: "idle",
};

export const loadCryptoData = createAsyncThunk(
  "crypto/loadCryptoData",
  async ({ symbol, range }: { symbol: string; range: Range }) => {
    const key = `${symbol}-${range}`;
    const cached = getCachedData(key);
    if (cached) return cached;

    const data = await fetchCryptoData(symbol, range);
    setCachedData(key, data);
    return data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSymbol(state, action) {
      state.symbol = action.payload;
    },
    setRange(state, action) {
      state.range = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCryptoData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(loadCryptoData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSymbol, setRange } = cryptoSlice.actions;
export default cryptoSlice.reducer;
