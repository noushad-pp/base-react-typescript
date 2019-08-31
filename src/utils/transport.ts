import { merge } from 'lodash';
import { AllowedMethods } from '../app/request';

export const defaultOptions: RequestInit = {
  credentials: 'include',
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    'content-type': 'application/json',
    accept: 'application/json',
  },
};

export type ApiResponse = {
  response: unknown;
  success: boolean;
  status: number;
  statusText: string;
};

const doFetch = async (url: string, options: RequestInit) => fetch(url, merge(defaultOptions, options));

export const apiRequest = async <Response>(url: string, options: RequestInit): Promise<ApiResponse> => {
  const response = await doFetch(url, options);

  // TODO: handle non JSON response?
  const apiResponse: ApiResponse = {
    success: response.ok,
    status: response.status,
    statusText: response.statusText,
    response: await response.clone().json(),
  };

  return new Promise<ApiResponse>((resolve) => resolve(apiResponse));
};

export const request = async (method: AllowedMethods, url: string, body?: unknown, options: RequestInit = {}) =>
  apiRequest(url, { ...options, body: body !== undefined ? JSON.stringify(body) : undefined, method });
