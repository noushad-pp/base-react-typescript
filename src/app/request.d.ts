import { AnyAction } from 'redux';

export type ApiRequestActionStart<T = unknown> = {
  type: T;
};

export type ApiRequestActionFinish<T = unknown, D = unknown> = {
  type: T;
  response: D;
  meta: {
    statusText: string;
  };
};

export type AllowedMethods = 'GET' | 'POST' | 'PUT';

export type ApiRequestAction<RequestBody = unknown> = {
  type: 'API_REQUEST';

  requestType: string;
  responses: {
    success: AnyAction;
    error: AnyAction;
    [k: number]: AnyAction;
  };
  endpoint: string;
  options?: Pick<RequestInit, Exclude<keyof RequestInit, 'body' | 'method'>>;

  method: AllowedMethods;
  body?: RequestBody;
};
