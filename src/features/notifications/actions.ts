import {
  Notification,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_NEUTRAL,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_WARNING,
  NotificationType,
} from './types';

export const ADD_NOTIFICATION = 'feature/alerts/ADD_NOTIFICATION';

type AddNotificationAction = {
  type: typeof ADD_NOTIFICATION;
  notification: Notification;
};

const addNotification = (type: NotificationType, text: string, details?: string): AddNotificationAction => ({
  type: ADD_NOTIFICATION,
  notification: { type, text, details },
});

export const addNeutralNotification = (text: string, details?: string) =>
  addNotification(NOTIFICATION_TYPE_NEUTRAL, text, details);
export const addErrorNotification = (text: string, details?: string) =>
  addNotification(NOTIFICATION_TYPE_ERROR, text, details);
export const addWarningNotification = (text: string, details?: string) =>
  addNotification(NOTIFICATION_TYPE_WARNING, text, details);
export const addSuccessNotification = (text: string, details?: string) =>
  addNotification(NOTIFICATION_TYPE_SUCCESS, text, details);

export const REMOVE_NOTIFICATION = 'feature/alerts/REMOVE_NOTIFICATION';

type RemoveNotificationAction = {
  type: typeof REMOVE_NOTIFICATION;
  index: number;
};

export const removeNotification = (index: number): RemoveNotificationAction => ({
  type: REMOVE_NOTIFICATION,
  index,
});

export type NotificationActions = AddNotificationAction | RemoveNotificationAction;
