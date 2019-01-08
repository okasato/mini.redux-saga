import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { MarketsTypes } from './action';

const INITIAL_STATE = Immutable({
  markets: [],
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

const fetchMarketsSuccess = (state, action) => {
  console.log('action is', action)
  return { 
    ...state, 
    markets: action.markets,
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
  [MarketsTypes.FETCH_MARKETS_ERROR]: fetchMarketsError,
  [MarketsTypes.FETCH_TICKERS_REQUEST]: fetchTickersRequest,
  [MarketsTypes.FETCH_TICKERS_SUCCESS]: fetchTickersSuccess,
  [MarketsTypes.FETCH_TICKERS_ERROR]: fetchTickersError,
});