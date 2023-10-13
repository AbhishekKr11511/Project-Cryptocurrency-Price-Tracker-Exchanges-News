import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../services/cryptoApi'
import newsReducer from '../services/newsApi'
import coinDetailsReducer from '../services/cryptoDetailsApi'
import coinHistoryReducer from '../services/cryptoHistory'
import exchangeReducer from '../services/cryptoExchange'
// import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    coinsApi : coinReducer,
    newsApi : newsReducer,
    coinDetailsApi : coinDetailsReducer,
    coinHistoryApi : coinHistoryReducer,
    exchangeApi : exchangeReducer
  },
})