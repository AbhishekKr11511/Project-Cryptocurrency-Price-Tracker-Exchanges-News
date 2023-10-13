import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchExchanges = createAsyncThunk('exchange/fetch', async(coinId='Qwsogvtv82FCd')=>{
    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/exchanges`,
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          limit: '50',
          offset: '0',
          orderBy: '24hVolume',
          orderDirection: 'desc'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
        }
      };

  const exchange = await axios(options).then((response) => response.data).then((result) => {
    return result
    })
  return exchange 
})

const exchangeSlice = createSlice({
  name: 'exchangeApi',
  initialState : {
    data : null,
    loading : false,
    error : '',
  },
  reducers : {},
  extraReducers : (builder) => {
    builder
    .addCase(fetchExchanges.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchExchanges.fulfilled, (state, action) => {
      state.loading = false
      state.data =  action.payload
    })
    .addCase(fetchExchanges.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default exchangeSlice.reducer


