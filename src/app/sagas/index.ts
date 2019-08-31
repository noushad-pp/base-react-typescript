import { fork } from 'redux-saga/effects';
import apiRequestSaga from './apiRequest';
import notificationsSaga from './notifications';

function* rootSaga() {
  yield fork(apiRequestSaga);
  yield fork(notificationsSaga);
}

export default rootSaga;
