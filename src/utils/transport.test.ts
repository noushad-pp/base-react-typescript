import { apiRequest, ApiResponse, request } from './transport';

type MockedFetchResponse = {
  ok?: boolean;
  json?: () => {};
  status?: number;
  text?: () => string | null;
  statusText?: string;
};

const mockFetch = (fetchResponse: MockedFetchResponse) => {
  return ((global as any).fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...fetchResponse,
      clone: () => fetchResponse,
    })
  ));
};

describe('utils', () => {
  describe('api', () => {
    afterEach(() => {
      (global as any).fetch = undefined;
    });

    describe('apiRequest', () => {
      it('should return an response object', async () => {
        mockFetch({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: () => ({ response: 'data' }),
        });

        const expectedResponse: ApiResponse = {
          response: { response: 'data' },
          status: 200,
          statusText: 'OK',
          success: true,
        };

        const response = await apiRequest('/test', {});
        expect(response).toEqual(expectedResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      it('should return error in the response object', async () => {
        mockFetch({
          ok: false,
          status: 500,
          statusText: 'Server Error',
          json: () => ({ error: 'message' }),
        });

        const expectedResponse: ApiResponse = {
          response: { error: 'message' },
          status: 500,
          statusText: 'Server Error',
          success: false,
        };

        const response = await apiRequest('/test', {});
        expect(response).toEqual(expectedResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-requested-with': 'XMLHttpRequest',
    };
    const baseGetHeaders = {
      credentials: 'include',
      headers: {
        ...headers,
      },
      method: 'GET',
    };
    const basePostHeaders = {
      credentials: 'include',
      headers: {
        'X-Additional': 'Testing',
        ...headers,
      },
      method: 'POST',
    };

    describe('get', () => {
      it('should be called with proper url and headers', async () => {
        mockFetch({
          ok: true,
          json: () => ({ response: 'data' }),
        });

        await request('GET', '/test');

        expect(fetch).toBeCalledWith('/test', baseGetHeaders);
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });

    describe('post', () => {
      it('should be called with proper url, headers and data', async () => {
        const postData = { post: 'data' };
        mockFetch({
          ok: true,
          json: () => ({ response: 'data' }),
        });

        const additionalOptions: RequestInit = {
          headers: {
            'X-Additional': 'Testing',
          },
        };
        await request('POST', '/test', postData, additionalOptions);

        expect(fetch).toBeCalledWith('/test', {
          ...basePostHeaders,
          body: JSON.stringify(postData),
        });
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
