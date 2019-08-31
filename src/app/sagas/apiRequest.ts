import { merge } from 'lodash';
import { AnyAction } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse, request } from '../../utils/transport';
import { ApiRequestAction, ApiRequestActionFinish, ApiRequestActionStart } from '../request';

const hasDefinedResponse = (status: keyof ApiRequestAction['responses'], action: ApiRequestAction): boolean => {
  return Boolean(action.responses[status]);
};

const getResponse = (status: number, success: boolean, action: ApiRequestAction): AnyAction => {
  if (hasDefinedResponse(status, action)) {
    return action.responses[status];
  }

  if (success) {
    return action.responses.success;
  }

  return action.responses.error;
};

const prepareAuthOptions = (accessToken: string | null, options?: RequestInit): RequestInit =>
  merge(options, {
    headers: {
      Authorization: accessToken ? 'Bearer ' + accessToken : null,
    },
  });

function* apiRequest(action: ApiRequestAction) {
  try {
    yield put<ApiRequestActionStart>({ type: action.requestType });

    const accessToken = null;
    const options: RequestInit = prepareAuthOptions(accessToken, action.options);
    const response: ApiResponse = yield call(request, action.method, action.endpoint, action.body, options);

    yield put<ApiRequestActionFinish>({
      ...getResponse(response.status, response.success, action),
      response: response.response,
      meta: {
        statusText: response.statusText,
      },
    });
  } catch (e) {
    yield put<ApiRequestActionFinish>({
      ...action.responses.error,
      response: null,
      meta: {
        statusText: e.message,
      },
    });
  }
}

export default function* apiRequestSaga() {
  yield takeEvery<ApiRequestAction>('API_REQUEST', apiRequest);
}
