import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './action';
import MarketPair from './MarketPair';

const App = ({ markets, fetchMarketsRequest }) => {

  return (
    <div className='container'>
      <ul>
        {markets.map((market, index) => {
          return (
            <MarketPair
              index={index}
              market={market}
            />
          )
        })}
      </ul>
      <button type='button' onClick={fetchMarketsRequest}>FETCH</button>
    </div>
  )
}

// class App extends Component {

//   render() {
//     const {
//       markets,
//       fetchMarketsRequest,
//     } = this.props;

//     return (
//       <div className='container'>
//         <ul>
//           {markets.map((market, index) => {
//             return (
//               <MarketPair
//                 index={index}
//                 market={market}
//               />
//             )
//           })}
//         </ul>
//         <button type='button' onClick={fetchMarketsRequest}>FETCH</button>
//       </div>
//     )
//   }
// }

const mapStateToProps = ({
  markets,
  marketsRequest,
  marketsSuccess,
  marketsError,
}) => {
  return {
    markets,
    marketsRequest,
    marketsSuccess,
    marketsError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMarketsRequest: () => dispatch(actions.fetchMarketsRequest()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
