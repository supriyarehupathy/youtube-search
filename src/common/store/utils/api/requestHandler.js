import API from './index';

const requestHandler = (url, method, { data, params }, isTokenNeeded) =>
  ({
    promise: API.request({
      url,
      method,
      data,
      params,
      isTokenNeeded,
    }),
  });

export default requestHandler;
