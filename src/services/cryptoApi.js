import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchCoins = createAsyncThunk('data/fetch', async(limit=10)=>{
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: `${limit}`,
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
      }
    };

  const list = await axios(options).then((response) => response.data).then((result) => {
    return result
    })
  return list
})

const coinsSlice = createSlice({
  name: 'coinsApi',
  initialState : {
    data : null,
    loading : false,
    error : '',
  },
  reducers : {},
  extraReducers : (builder) => {
    builder
    .addCase(fetchCoins.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchCoins.fulfilled, (state, action) => {
      state.loading = false
      state.data =  action.payload
    })
    .addCase(fetchCoins.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default coinsSlice.reducer


