import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { ApplicationState } from '../types';

const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    router: connectRouter(history),
  });

export default createRootReducer;
