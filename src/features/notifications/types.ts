export const STORE_KEY_NOTIFICATIONS = 'notifications';
export const NOTIFICATION_TYPE_NEUTRAL = 'neutral';
export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_WARNING = 'warning';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export type NotificationType =
  | typeof NOTIFICATION_TYPE_NEUTRAL
  | typeof NOTIFICATION_TYPE_ERROR
  | typeof NOTIFICATION_TYPE_WARNING
  | typeof NOTIFICATION_TYPE_SUCCESS;

export type Notification = Readonly<{
  type: NotificationType;
  text: string;
  details?: string;
}>;

export type NotificationsState = Notification[];
