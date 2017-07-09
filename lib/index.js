'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _checkTypes = require('check-types');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _DefaultHandler = require('./DefaultHandler');

var _DefaultHandler2 = _interopRequireDefault(_DefaultHandler);

var _CouponHandler = require('./CouponHandler');

var _CouponHandler2 = _interopRequireDefault(_CouponHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.Promise = _bluebird2.default;

/** Thinkific API wrapper
 * @property {courses} courses A {@link DefaultHandler} for handling courses resource
 * @property {products} products A {@link DefaultHandler} for handling products resource
 * @property {promotions} promotions A {@link DefaultHandler} for handling promotions resource
 * @property {coupons} coupons A {@link CouponHandler} for handling coupons resource
*/
var Thinkific = function () {

  /**
   * @summary Constructs a new Thinkific requester.
   * @param  {object} opts An object containg the subdomain and API key
   * @param  {string} opts.apiKey API Key for authorization headers
   * @param  {string} opts.subdomain subdomain of Thinkific site
   * @returns {object} Return an object with access to Thinkific API resources: courses, products, promotions, coupons
   */
  function Thinkific(opts) {
    _classCallCheck(this, Thinkific);

    _checkTypes2.default.assert.assigned(opts, 'Missing options parameter');
    _checkTypes2.default.assert.assigned(opts.apiKey, 'Missing apiKey option');
    _checkTypes2.default.assert.assigned(opts.subdomain, 'Missing subdomain option');

    this.apiKey = opts.apiKey;
    this.subdomain = opts.subdomain;
    this._header = {
      'x-auth-api-key': this.apiKey,
      'x-auth-subdomain': this.subdomain
    };

    this.courses = new _DefaultHandler2.default(_config2.default.urls.courses, this);
    this.products = new _DefaultHandler2.default(_config2.default.urls.products, this);
    this.promotions = new _DefaultHandler2.default(_config2.default.urls.promotions, this);
    this.coupons = new _CouponHandler2.default(_config2.default.urls.coupons, this);
  }

  _createClass(Thinkific, [{
    key: '_get',
    value: function _get(uri) {
      return (0, _requestPromise2.default)({
        method: 'GET',
        uri: (0, _urlJoin2.default)(_config2.default.api, uri),
        headers: this._header,
        json: true
      });
    }
  }, {
    key: '_post',
    value: function _post(uri, data) {
      return (0, _requestPromise2.default)({
        method: 'POST',
        uri: (0, _urlJoin2.default)(_config2.default.api, uri),
        headers: this._header,
        body: data,
        json: true
      });
    }
  }, {
    key: '_put',
    value: function _put(uri, data) {
      return (0, _requestPromise2.default)({
        method: 'PUT',
        uri: (0, _urlJoin2.default)(_config2.default.api, uri),
        headers: this._header,
        body: data,
        json: true
      });
    }
  }, {
    key: '_del',
    value: function _del(uri) {
      return (0, _requestPromise2.default)({
        method: 'DELETE',
        uri: (0, _urlJoin2.default)(_config2.default.api, uri),
        headers: this._header,
        json: true
      });
    }
  }]);

  return Thinkific;
}();

exports.default = Thinkific;