import { put, takeEvery } from 'redux-saga/effects';
import { addErrorNotification } from '../../features/notifications';

const errorSaga = (text: string) => {
  return function* putErrorNotification() {
    yield put(addErrorNotification(text));
  };
};

export default function* notificationsSaga() {
  yield takeEvery<any>('SHOW_ERROR_NOTIFICATION', errorSaga('Something went wrong'));
}
