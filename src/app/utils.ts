import { AnyAction } from 'redux';
import { ApiRequestAction } from './request';

export const hasDefinedResponse = (status: keyof ApiRequestAction['responses'], action: ApiRequestAction): boolean => {
  return Boolean(action.responses[status]);
};

export const getResponse = (status: number, success: boolean, action: ApiRequestAction): AnyAction => {
  if (hasDefinedResponse(status, action)) {
    return action.responses[status];
  }

  if (success) {
    return action.responses.success;
  }

  return action.responses.error;
};
