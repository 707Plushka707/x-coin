import axios from 'axios';
import * as utils from 'axios/lib/utils';

const services = axios.create({
  baseURL: 'http://localhost:3100',
});

const request = (options) => {
  return new Promise((resolve, reject) => {
    services(options)
      .then((r) => resolve(r.data, r))
      .catch(reject);
  });
};

utils.forEach(
  ['delete', 'get', 'head', 'options'],
  function forEachMethodNoData(method) {
    request[method] = function (url, data, config) {
      return request(
        utils.merge(config || {}, {
          method,
          url,
          params: data,
        })
      );
    };
  }
);

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  request[method] = function (url, data, config) {
    return request(
      utils.merge(config || {}, {
        method,
        url,
        data,
      })
    );
  };
});

export default request;
