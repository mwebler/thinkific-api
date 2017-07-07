"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Iterable = function () {
  function Iterable(items, pagination, _handler) {
    _classCallCheck(this, Iterable);

    this.items = items;
    this.pagination = pagination;
    this._handler = _handler;
  }

  _createClass(Iterable, [{
    key: "hasNext",
    value: function hasNext() {
      if (!this.pagination.next_page) {
        return false;
      }
      return true;
    }
  }, {
    key: "getNext",
    value: function getNext() {
      if (!this.hasNext()) {
        return Promise.resolve(null);
      }
      return this._handler._getPage(this.pagination.next_page);
    }
  }]);

  return Iterable;
}();

exports.default = Iterable;