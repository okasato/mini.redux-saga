import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './action';
import Market from './Market';

class App extends Component {

  render() {
    console.log('rendered')
    const {
      markets,
      fetchMarketsRequest,
      fetchTickersRequest,
      updatedMarkets,
    } = this.props;
    
    return (
      <div className='container'>
        <div>
          {markets.map((market, index) => {
            return (
              <div key={index}>
                <div>{`[${index}] ${market.market}`}</div>
                <div>{market.last}</div>
              </div>
            )
          })}
        </div>
        <button type='button' onClick={fetchMarketsRequest}>FETCH</button>
      </div>
    )
  }
}

const mapStateToProps = ({
  markets,
  marketsRequest,
  marketsSuccess,
  marketsError,
  updatedMarkets,
}) => {
  return {
    markets,
    marketsRequest,
    marketsSuccess,
    marketsError,
    updatedMarkets,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMarketsRequest: () => dispatch(actions.fetchMarketsRequest()),
    fetchTickersRequest: market => dispatch(actions.fetchTickersRequest(market)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
