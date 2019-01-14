import React, { Component } from 'react';
import { connect } from 'react-redux';

class MarketPair extends Component {

  render() {
    const {
      market,
      changes,
      index,
    } = this.props;

    return (
      <div className='marketPair' key={index}>
        <div>{`[${index}] ${market.market}`}</div>
        <div>{market.last}</div>
        <div style={{ color: changes[index] > 0 ? 'lime' : 'red' }}>{changes[index]}</div>
      </div>
    )
  }
}

const mapStateToProps = ({
  markets,
  changes,
}) => {
  return {
    markets,
    changes,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchMarketsRequest: () => dispatch(actions.fetchMarketsRequest()),
//     fetchTickersRequest: market => dispatch(actions.fetchTickersRequest(market)),
//   }
// };

export default connect(mapStateToProps, null)(MarketPair);
