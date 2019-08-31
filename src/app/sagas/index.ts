import { fork } from 'redux-saga/effects';
import apiRequestSaga from './apiRequest';

function* rootSaga() {
  yield fork(apiRequestSaga);
}

export default rootSaga;
