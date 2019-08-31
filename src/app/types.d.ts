import { RouterState } from 'connected-react-router';
import { PersistPartial } from 'redux-persist/es/persistReducer';
// import { ApiRequestAction, ApiRequestActionFinish, ApiRequestActionStart } from './request';

type Nullable<T> = T | null;
type Persisted<T> = T & PersistPartial;

type ApplicationState = {
  router: RouterState;
};
