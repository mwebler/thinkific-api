'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkTypes = require('check-types');

var _checkTypes2 = _interopRequireDefault(_checkTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function Client(opts) {
  _classCallCheck(this, Client);

  _checkTypes2.default.assert.assigned(opts, 'Invalid parameter');
  _checkTypes2.default.assert.assigned(opts.apiKey, 'Invalid parameter');
  _checkTypes2.default.assert.assigned(opts.subdomain, 'Invalid parameter');

  this.apiKey = opts.apiKey;
  this.subdomain = opts.subdomain;
};

exports.default = Client;