import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './action'

class Market extends Component {
  render() {
    const { ticker } = this.props;
    // console.log(ticker);
    return (
      <div>
        {/* Click the above market button to get the ticker info of the market. */}
      </div>
    )
  }
}

const mapStateToProps = ({
  ticker
}) => {
  return {
    ticker
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTickersRequest: market => dispatch(actions.fetchTickersRequest(market)),
  }
};

export default connect(mapStateToProps, null)(Market);
