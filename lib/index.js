'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkTypes = require('check-types');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(opts) {
    _classCallCheck(this, Client);

    _checkTypes2.default.assert.assigned(opts, 'Missing options parameter');
    _checkTypes2.default.assert.assigned(opts.apiKey, 'Missing apiKey option');
    _checkTypes2.default.assert.assigned(opts.subdomain, 'Missing subdomain option');

    this.apiKey = opts.apiKey;
    this.subdomain = opts.subdomain;
  }

  _createClass(Client, [{
    key: 'doRequest',
    value: function doRequest() {
      return _requestPromise2.default.get((0, _urlJoin2.default)(_config2.default.api, _config2.default.urls.courses));
    }
  }, {
    key: 'getAllCourses',
    value: function getAllCourses() {
      return this.doRequest();
    }
  }]);

  return Client;
}();

exports.default = Client;