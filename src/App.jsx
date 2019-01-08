import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './action';
import Market from './Market';

class App extends Component {
  componentWillMount() {

  }

  render() {
    const {
      markets,
      fetchMarketsRequest,
      fetchTickersRequest,
    } = this.props;
    console.log('what is market in App component?', markets)
    return (
      <div className='container'>
        <div>
          {markets.map((market, index) => {
            const { id } = market;
            return (
              <div>
                {/* <div key={index}>{market.name}</div> */}
                <div key={index}>{market.market}</div>
                <div key={index}>{market.ticker.last}</div>
                {/* <button
                  key={index}
                  type='button'
                  onClick={fetchTickersRequest(id)}
                >
                  GET
                </button>
                <Market /> */}
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
  marketsError
}) => {
  return {
    markets,
    marketsRequest,
    marketsSuccess,
    marketsError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMarketsRequest: () => dispatch(actions.fetchMarketsRequest()),
    fetchTickersRequest: market => dispatch(actions.fetchTickersRequest(market)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
