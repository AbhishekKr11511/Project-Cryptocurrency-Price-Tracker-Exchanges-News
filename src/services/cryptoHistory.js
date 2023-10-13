import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHistory = createAsyncThunk("history/fetch", async ({coinId, timePeriod}) => {

  console.log(coinId);
  console.log(timePeriod);

    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: timePeriod
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
        }
      };

  const history = await axios(options)
    .then((response) => response.data)
    .then((result) => {
      return result;
    });
  return history;
});

const coinHistorySlice = createSlice({
  name: "coinHistoryApi",
  initialState: {
    data2: null,
    loading2: false,
    error2: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading2 = true;
        state.error2 = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading2 = false;
        state.data2 = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading2 = false;
        state.error2 = action.error.message;
      });
  },
});

export default coinHistorySlice.reducer
