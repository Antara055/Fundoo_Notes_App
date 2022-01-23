"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.client = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redis = require("redis");

var client = (0, _redis.createClient)();
exports.client = client;

var redis = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client.on('error', function (err) {
              return console.log('Redis Client Error', err);
            });
            _context.next = 3;
            return client.connect();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function redis() {
    return _ref.apply(this, arguments);
  };
}();

var _default = redis;
exports["default"] = _default;