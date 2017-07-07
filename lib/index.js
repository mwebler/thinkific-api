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

var _Courses = require('./Courses');

var _Courses2 = _interopRequireDefault(_Courses);

var _Products = require('./Products');

var _Products2 = _interopRequireDefault(_Products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.Promise = _bluebird2.default;

var Thinkific = function () {
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

    this.courses = new _Courses2.default(this);
    this.products = new _Products2.default(this);
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
        header: this._header,
        body: data,
        json: true
      });
    }
  }]);

  return Thinkific;
}();

exports.default = Thinkific;