import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './action';
import Market from './Market';

class App extends Component {

  render() {
    const {
      markets,
      fetchMarketsRequest,
      // fetchTickersRequest,
      // updatedMarkets,
      changes,
    } = this.props;

    return (
      <div className='container'>
        <div>
          {markets.map((market, index) => {
            const color = changes[index] > 0 ? 'lime' : 'red';
            return (
              <div key={index}>
                <div>{`[${index}] ${market.market}`}</div>
                <div>{market.last}</div>
                <div style={{ color: color }}>{changes[index]}</div>
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
  changes,
}) => {
  return {
    markets,
    marketsRequest,
    marketsSuccess,
    marketsError,
    updatedMarkets,
    changes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMarketsRequest: () => dispatch(actions.fetchMarketsRequest()),
    fetchTickersRequest: market => dispatch(actions.fetchTickersRequest(market)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
