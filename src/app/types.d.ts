import { RouterState } from 'connected-react-router';
import { PersistPartial } from 'redux-persist/es/persistReducer';
// import { ApiRequestAction, ApiRequestActionFinish, ApiRequestActionStart } from './request';
import { STORE_KEY_NOTIFICATIONS } from "features/notifications";
import { NotificationsState } from "features/notifications/types";

type Nullable<T> = T | null;
type Persisted<T> = T & PersistPartial;

type ApplicationState = {
  router: RouterState;
  [STORE_KEY_NOTIFICATIONS]: NotificationsState;
};
