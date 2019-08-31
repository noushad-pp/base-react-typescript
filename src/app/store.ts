import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';
import { ApplicationState } from './types';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};
const configureStore = (history: History, initialState: Partial<ApplicationState> = {}) => {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)));

  const reducer = rootReducer(history);
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
};

export default configureStore;
