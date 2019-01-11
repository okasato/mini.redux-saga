import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { MarketsTypes } from './action';

const INITIAL_STATE = Immutable({
  markets: [],
  updatedMarkets: [],
  marketsRequest: false,  
  marketsSuccess: false,
  marketsError: false,
  ticker: [],
  tickersRequest: false,
  tickersSuccess: false,
  tickersError: false,
});

const fetchMarketsRequest = state => {
  return { 
    ...state,
    marketsRequest: true,
  };
}

const websocketMarketsSuccess = (state, action) => {
  for (let i = 0; i < action.markets.length; i += 1) {
    for (let j = 0; j < state.markets.length; j += 1) {
      if (state.markets[j].market === action.markets[i].market) {
        state.markets[j].last = action.markets[i].ticker.last;
      }
    }
  }
  const updatedMarkets = state.markets;

  return { 
    ...state,
    updatedMarkets,
    markets: updatedMarkets,
  };
}

const fetchMarketsSuccess = (state, action) => {
  const markets = action.markets.map(market => {
    if (market.ticker) {
      return {
        market: market.market,
        last: market.ticker.last
      }
    }
    return {
      market: market.market,
      last: market.last
    }
  });

  return { 
    ...state,
    markets,
    marketsSuccess: true,
  };
}

const fetchMarketsError = state => {
  return {
    ...state, 
    marketsError: true,
  };
}

const fetchTickersRequest = state => {
  return { 
    ...state,
    tickersRequest: true,
  };
}

const fetchTickersSuccess = (state, action) => {
  return { 
    ...state, 
    ticker: action.market,
    tickersSuccess: true,
  };
}

const fetchTickersError = state => {
  return {
    ...state, 
    tickersError: true,
  };
}

export default createReducer(INITIAL_STATE, {
  [MarketsTypes.FETCH_MARKETS_REQUEST]: fetchMarketsRequest,
  [MarketsTypes.FETCH_MARKETS_SUCCESS]: fetchMarketsSuccess,
  [MarketsTypes.WEBSOCKET_MARKETS_SUCCESS]: websocketMarketsSuccess,
  [MarketsTypes.FETCH_MARKETS_ERROR]: fetchMarketsError,
  [MarketsTypes.FETCH_TICKERS_REQUEST]: fetchTickersRequest,
  [MarketsTypes.FETCH_TICKERS_SUCCESS]: fetchTickersSuccess,
  [MarketsTypes.FETCH_TICKERS_ERROR]: fetchTickersError,
});