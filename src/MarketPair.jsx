import React, { Component } from 'react';
import { connect } from 'react-redux';

const isEqual = (nextProp, currentProp) => {
  return JSON.stringify(nextProp) === JSON.stringify(currentProp);
}

class MarketPair extends Component {
  shouldComponentUpdate(nextProps) {
    const propsDiff = isEqual(nextProps.market, this.props.market);
    return !propsDiff;
  }

  render() {
    const {
      market,
      changes,
      index,
    } = this.props;
    console.log('hey index is', index)
    return (
      <li className='marketPair' key={index}>
        <div style={{ fontSize: 20, fontFamily: 'Avenir' }}>{`${market.market} ${market.last}`}</div>
        <div style={{ fontFamily: 'Avenir', color: changes[index] >= 0 ? 'lime' : 'red' }}>
          {`${changes[index] >= 0 ? '↑' : '↓'} ${changes[index] ? changes[index].toFixed(2) : 0}%`}
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({
  changes,
}, ownProps) => {
  console.log('ownProps', ownProps)
  return {
    changes,
  }
}

export default connect(mapStateToProps, null)(MarketPair);
