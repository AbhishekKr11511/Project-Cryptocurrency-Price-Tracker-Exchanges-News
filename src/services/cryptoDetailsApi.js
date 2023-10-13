import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetails = createAsyncThunk("data/fetch", async (coinId) => {
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
        }
      };

  const details = await axios(options)
    .then((response) => response.data)
    .then((result) => {
      return result;
    });
  return details;
});

const coinDetailsSlice = createSlice({
  name: "coinDetailsApi",
  initialState: {
    data: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coinDetailsSlice.reducer
