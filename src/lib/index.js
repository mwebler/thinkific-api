import bluebird from 'bluebird';
import check from 'check-types';
import request from 'request-promise';
import urljoin from 'url-join';

import config from './config';

import DefaultHandler from './DefaultHandler';
import CouponHandler from './CouponHandler';

global.Promise = bluebird;

const Thinkific = class Thinkific {
  constructor(opts) {
    check.assert.assigned(opts, 'Missing options parameter');
    check.assert.assigned(opts.apiKey, 'Missing apiKey option');
    check.assert.assigned(opts.subdomain, 'Missing subdomain option');

    this.apiKey = opts.apiKey;
    this.subdomain = opts.subdomain;
    this._header = {
      'x-auth-api-key': this.apiKey,
      'x-auth-subdomain': this.subdomain
    };

    this.courses = new DefaultHandler(config.urls.courses, this);
    this.products = new DefaultHandler(config.urls.products, this);
    this.promotions = new DefaultHandler(config.urls.promotions, this);
    this.coupons = new CouponHandler(config.urls.coupons, this);

  }

  _get(uri) {
    return request({
      method: 'GET',
      uri: urljoin(config.api, uri),
      headers: this._header,
      json: true
    });
  }

  _post(uri, data) {
    return request({
      method: 'POST',
      uri: urljoin(config.api, uri),
      headers: this._header,
      body: data,
      json: true
    });
  }

  put_(uri, data) {
    return request({
      method: 'PUT',
      uri: urljoin(config.api, uri),
      headers: this._header,
      body: data,
      json: true
    });
  }

  _del(uri) {
    return request({
      method: 'DELETE',
      uri: urljoin(config.api, uri),
      headers: this._header,
      json: true
    });
  }


};

export default Thinkific;
