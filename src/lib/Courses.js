import Iterable from './Iterable';

const Courses = class CourseHandler {
  constructor(_client) {
    this._client = _client;
  }

  getList() {
    return this._getPage(1);
  }

  _getPage(page = 1) {
    return this._get(this._uriPage(page))
    .then((response) => {
      return new Iterable(response.items, response.meta.pagination, this);
    });
  }

  _uriPage(page = 1) {
    return `courses?page=${page}`;
  }

  _uriSingle(id) {
    return `courses/${id}`;
  }

  _get(...params) {
    return this._client._get(...params);
  }

  _post(...params) {
    return this._client._post(...params);
  }
};

export default Courses;
