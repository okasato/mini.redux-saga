import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchMarketsRequest: null,
  fetchMarketsSuccess: ['markets', 'websocketMarkets'],
  // websocketMarketsSuccess: ['markets'],
  fetchMarketsError: null,
  fetchTickersRequest: null,
  fetchTickersSuccess: ['market'],
  fetchTickersError: null,
});

export const MarketsTypes = Types;
export default Creators;