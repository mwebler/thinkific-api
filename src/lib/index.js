import check from 'check-types';

class Client {
  constructor(opts) {
    check.assert.assigned(opts, 'Invalid parameter');
    check.assert.assigned(opts.apiKey, 'Invalid parameter');
    check.assert.assigned(opts.subdomain, 'Invalid parameter');

    this.apiKey = opts.apiKey;
    this.subdomain = opts.subdomain;
  }
}

export default Client;
