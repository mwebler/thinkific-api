import check from 'check-types';
import request from 'request-promise';
import urljoin from 'url-join';

import config from './config';

class Client {
  constructor(opts) {
    check.assert.assigned(opts, 'Missing options parameter');
    check.assert.assigned(opts.apiKey, 'Missing apiKey option');
    check.assert.assigned(opts.subdomain, 'Missing subdomain option');

    this.apiKey = opts.apiKey;
    this.subdomain = opts.subdomain;
  }

  doRequest() {
    return request.get(urljoin(config.api, config.urls.courses));
  }

  getAllCourses() {
    return this.doRequest();
  }
}

export default Client;
