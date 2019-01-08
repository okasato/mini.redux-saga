import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import marketsReducer from './reducer';
import rootSaga from './saga';


export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    marketsReducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  
  return store;
}