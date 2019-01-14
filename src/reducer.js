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
  changes: [],
});

const fetchMarketsRequest = state => {
  return { 
    ...state,
    marketsRequest: true,
  };
}

const fetchMarketsSuccess = (state, action) => {
  // const updatedMarkets = action.markets.map(marketPair => {
  //   for (let i = 0; i < action.websocketMarkets.length; i += 1) {
  //     if (action.websocketMarkets[i].market === marketPair.market) {
  //       marketPair = action.websocketMarkets[i];
  //       return marketPair;
  //     }
  //   }
  //   return marketPair;
  // });

  // const formatedMarkets = updatedMarkets.map(market => {
  //   if (market.ticker) {
  //     return {
  //       market: market.market,
  //       last: market.ticker.last
  //     }
  //   }
  //   return {
  //     market: market.market,
  //     last: market.last
  //   }
  // });
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
  const currentChanges = state.changes.slice();
  let changes = [];
  for (let i = 0; i < state.markets.length; i += 1) {
    if (markets[i].last - state.markets[i].last === 0 && currentChanges[i]) {      
      changes.push(currentChanges[i]);
    } else {
      changes.push(markets[i].last - state.markets[i].last);
    }
  }

  return { 
    ...state,
    // markets: formatedMarkets,
    markets,
    marketsSuccess: true,
    changes,
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