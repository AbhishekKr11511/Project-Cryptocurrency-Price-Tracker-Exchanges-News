import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk('fetch/data', async(count=20)=>{
    const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
        q: 'cryptocurrency',
        count: `${count}`,
        freshness: 'Day',
        textFormat: 'Raw',
        safeSearch: 'Off'
    },
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_NEWS_API_HOST
    }
    };

    const news = await axios(options).then((response) => response.data).then((result) => {
        return result
        })
    return news
})

const newSlice = createSlice({
    name: "newsApi",
    initialState:{
        data: null,
        loading: false,
        error: ''
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchNews.pending, (state)=> {
            state.loading = true
        })
        .addCase(fetchNews.fulfilled, (state, action)=> {
            state.loading = false
            state.data = action.payload
        })
        .addCase(fetchNews.rejected, (state, action)=> {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default newSlice.reducer