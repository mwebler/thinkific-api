import check from 'check-types';

import DefaultHandler from './DefaultHandler';
import Iterable from './Iterable';

const CouponHandler = class CouponHandler extends DefaultHandler {
  // Override with promotion
  getList(promotion) {
    return this._getPage(promotion, 1);
  }

  create(data, promotion) {
    check.assert.assigned(data, 'Missing data parameter');

    return this._post(`${this._uri}?promotion_id=${promotion}`, data);
  }

  find() {
    // Neeeds to be reimplemented due to promotion parameter in the URL
    return Promise.reject('Not implemented');
  }

  _getPage(promotion, page = 1) {
    return this._get(this._uriPage(promotion, page))
      .then((response) => {
        return new Iterable(response.items, response.meta.pagination, this);
      });
  }

  _get(...params) {
    return this._client._get(...params);
  }

  _post(...params) {
    return this._client._post(...params);
  }

  _uriPage(promotion, page = 1) {
    return `${this._uri}?promotion_id=${promotion}&page=${page}`;
  }

  _uriSingle(id) {
    return `${this._uri}/${id}`;
  }

  get _uri() { return this._resource; }
};

export default CouponHandler;
