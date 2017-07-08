'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkTypes = require('check-types');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

var _DefaultHandler2 = require('./DefaultHandler');

var _DefaultHandler3 = _interopRequireDefault(_DefaultHandler2);

var _Iterable = require('./Iterable');

var _Iterable2 = _interopRequireDefault(_Iterable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CouponHandler = function (_DefaultHandler) {
  _inherits(CouponHandler, _DefaultHandler);

  function CouponHandler() {
    _classCallCheck(this, CouponHandler);

    return _possibleConstructorReturn(this, (CouponHandler.__proto__ || Object.getPrototypeOf(CouponHandler)).apply(this, arguments));
  }

  _createClass(CouponHandler, [{
    key: 'getList',

    // Override with promotion
    value: function getList(promotion) {
      return this._getPage(promotion, 1);
    }
  }, {
    key: 'create',
    value: function create(data, promotion) {
      _checkTypes2.default.assert.assigned(data, 'Missing data parameter');

      return this._post(this._uri + '?promotion_id=' + promotion, data);
    }
  }, {
    key: 'find',
    value: function find() {
      // Neeeds to be reimplemented due to promotion parameter in the URL
      return Promise.reject('Not implemented');
    }
  }, {
    key: '_getPage',
    value: function _getPage(promotion) {
      var _this2 = this;

      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return this._get(this._uriPage(promotion, page)).then(function (response) {
        return new _Iterable2.default(response.items, response.meta.pagination, _this2);
      });
    }
  }, {
    key: '_get',
    value: function _get() {
      var _client;

      return (_client = this._client)._get.apply(_client, arguments);
    }
  }, {
    key: '_post',
    value: function _post() {
      var _client2;

      return (_client2 = this._client)._post.apply(_client2, arguments);
    }
  }, {
    key: '_uriPage',
    value: function _uriPage(promotion) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      return this._uri + '?promotion_id=' + promotion + '&page=' + page;
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

  return CouponHandler;
}(_DefaultHandler3.default);

exports.default = CouponHandler;