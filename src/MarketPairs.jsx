import React, { Component } from 'react';
import { connect } from 'react-redux';

class MarketPairs extends Component {
  render() {
    // const { ticker } = this.props;
    return (
      <div>
        {/* Click the above market button to get the ticker info of the market. */}
      </div>
    )
  }
}

const mapStateToProps = ({
  markets
}) => {
  return {
    markets
  }
}

export default connect(mapStateToProps, null)(MarketPairs);
