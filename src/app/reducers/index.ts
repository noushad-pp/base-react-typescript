import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { notificationsReducer, STORE_KEY_NOTIFICATIONS } from '../../features/notifications';
import { ApplicationState } from '../types';

const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    router: connectRouter(history),
    [STORE_KEY_NOTIFICATIONS]: notificationsReducer,
  });

export default createRootReducer;
