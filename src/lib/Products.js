import check from 'check-types';

import Iterable from './Iterable';


const Products = class ProductHandler {
  constructor(_client) {
    this._client = _client;
  }

  getList() {
    return this._getPage(1);
  }

  getById(id) {
    check.assert.assigned(id, 'Missing id parameter');

    return this._get(this._uriSingle(id));
  }

  _getPage(page = 1) {
    return this._get(this._uriPage(page))
      .then((response) => {
        return new Iterable(response.items, response.meta.pagination, this);
      });
  }

  _uriPage(page = 1) {
    return `products?page=${page}`;
  }

  _uriSingle(id) {
    return `products/${id}`;
  }

  _get(...params) {
    return this._client._get(...params);
  }

  _post(...params) {
    return this._client._post(...params);
  }
};

export default Products;
