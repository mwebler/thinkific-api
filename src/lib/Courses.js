import check from 'check-types';

import Iterable from './Iterable';


const Courses = class CourseHandler {
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

  async find(property, value) {
    let courses = await this.getList();

    do {
      for (let i = 0; i < courses.items.length; i++) {
        const c = courses.items[i];

        if (c[property] === value) {
          return c;
        }
      }

      // get next page
      courses = await courses.getNext();
    } while (courses);

    return null;
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
