'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkTypes = require('check-types');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

var _Iterable = require('./Iterable');

var _Iterable2 = _interopRequireDefault(_Iterable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultHander = function () {
  function DefaultHandler(resource, _client) {
    _classCallCheck(this, DefaultHandler);

    this._client = _client;
    this._resource = resource;
  }

  _createClass(DefaultHandler, [{
    key: 'getList',
    value: function getList() {
      return this._getPage(1);
    }
  }, {
    key: 'getById',
    value: function getById(id) {
      _checkTypes2.default.assert.assigned(id, 'Missing id parameter');

      return this._get(this._uriSingle(id));
    }
  }, {
    key: 'create',
    value: function create(data) {
      _checkTypes2.default.assert.assigned(data, 'Missing data parameter');

      return this._post(this._uri, data);
    }
  }, {
    key: 'put',
    value: function put(id, data) {
      _checkTypes2.default.assert.assigned(id, 'Missing id parameter');
      _checkTypes2.default.assert.assigned(data, 'Missing data parameter');

      return this._put(this._uriSingle(id), data);
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      _checkTypes2.default.assert.assigned(id, 'Missing id parameter');

      return this._del(this._uriSingle(id));
    }
  }, {
    key: 'find',
    value: async function find(property, value) {
      var list = await this.getList();

      do {
        for (var i = 0; i < list.items.length; i++) {
          var item = list.items[i];

          if (item[property] === value) {
            return item;
          }
        }

        // get next page
        list = await list.getNext();
      } while (list);

      return null;
    }
  }, {
    key: '_getPage',
    value: function _getPage() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return this._get(this._uriPage(page)).then(function (response) {
        return new _Iterable2.default(response.items, response.meta.pagination, _this);
      });
    }
  }, {
    key: '_get',
    value: function _get() {
      var _client2;

      return (_client2 = this._client)._get.apply(_client2, arguments);
    }
  }, {
    key: '_post',
    value: function _post() {
      var _client3;

      return (_client3 = this._client)._post.apply(_client3, arguments);
    }
  }, {
    key: '_put',
    value: function _put() {
      var _client4;

      return (_client4 = this._client)._put.apply(_client4, arguments);
    }
  }, {
    key: '_del',
    value: function _del() {
      var _client5;

      return (_client5 = this._client)._del.apply(_client5, arguments);
    }
  }, {
    key: '_uriPage',
    value: function _uriPage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return this._uri + '?page=' + page;
    }
  }, {
    key: '_uriSingle',
    value: function _uriSingle(id) {
      return this._uri + '/' + id;
    }
  }, {
    key: '_uri',
    get: function get() {
      return this._resource;
    }
  }]);

  return DefaultHandler;
}();

exports.default = DefaultHander;