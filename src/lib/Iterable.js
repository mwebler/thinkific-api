const Iterable = class Iterable {
  constructor(items, pagination, _handler) {
    this.items = items;
    this.pagination = pagination;
    this._handler = _handler;
  }

  hasNext() {
    if (!this.pagination.next_page) {
      return false;
    }
    return true;
  }

  getNext() {
    if (!this.hasNext()) {
      return Promise.resolve(null);
    }
    return this._handler._getPage(this.pagination.next_page);
  }
};

export default Iterable;
