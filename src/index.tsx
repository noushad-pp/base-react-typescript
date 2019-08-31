import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app/App';
import history from './app/history';
import configureStore from './app/store';
import './index.module.css';

const { store, persistor } = configureStore(history);

const render = (Component: React.ComponentType) => {
  const RenderBlock = (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
  ReactDOM.render(RenderBlock, document.getElementById('root'));
};

render(App);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./app/App', () => {
    render(App);
  });
}
