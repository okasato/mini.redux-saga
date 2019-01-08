import { call, put, takeEvery, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import actions, { MarketsTypes } from '../src/action';
import io from 'socket.io-client';

const api = url => fetch(url).then(response => response.json());

// const socket = io('https://ws.coinfield.com/', { transports: ["websocket"] });
// const connect = () => {
//   const socket = io('https://ws.coinfield.com/');
//   return new Promise(resolve => {
//     socket.on('tickers', message =>  {
//       console.log('what is message?', message.data);
//       resolve(message.data);
//     });
//   }) 
// }

const websocketAPI = url => {
  return io(url); 
}

const createSocketChannel = socket => {
  return eventChannel(emit => {
    const tickersHandler = data => {
      console.log('waht is data?', data)
      emit(data);
    }
    socket.on('tickers', tickersHandler);
    const unsubscribe = () => {
      socket.off('tickers', tickersHandler)
    }
    return unsubscribe
  })
}

function* fetchMarkets(action) {
  try {
    // const response = yield call(api, `https://api.coinfield.com/v1/markets`);
    const socket = yield call(websocketAPI, 'https://ws.coinfield.com/');
    const socketChannel = yield call(createSocketChannel, socket);
    while(true) {
      const payload = yield take(socketChannel);
      yield put(actions.fetchMarketsSuccess(payload.data));
    }
    // yield put(actions.fetchMarketsSuccess(response.markets));
  } catch (error) {
    console.log(error);
  }
}

function* fetchTickers(action) {
  try {
    const response = yield call(api, `https://api.coinfield.com/v1/tickers/${action.market}`);
    yield put(actions.fetchTickersSuccess(response.markets));
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(MarketsTypes.FETCH_MARKETS_REQUEST, fetchMarkets),
    takeEvery(MarketsTypes.FETCH_TICKERS_REQUEST, fetchTickers),
  ]);
} 