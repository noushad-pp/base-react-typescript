import { Reducer } from 'redux';
import { ADD_NOTIFICATION, NotificationActions, REMOVE_NOTIFICATION } from './actions';
import { NotificationsState } from './types';

const initialState: NotificationsState = [];

const notificationsReducer: Reducer<NotificationsState, NotificationActions> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.notification];

    case REMOVE_NOTIFICATION:
      return state.filter((_, index) => index !== action.index);

    default:
      return state;
  }
};

export default notificationsReducer;
