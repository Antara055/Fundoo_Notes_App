"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisCheckSingleNote = exports.redisCheck = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redisdb = require("../config/redisdb");

var redisCheck = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var value;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _redisdb.client.get('getAllNotes');

          case 2:
            value = _context.sent;

            if (value == null) {
              next();
            } else {
              res.status(200).json({
                code: 200,
                data: JSON.parse(value),
                message: "Notes fetched successfully from redis"
              });
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function redisCheck(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.redisCheck = redisCheck;

var redisCheckSingleNote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, value, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params._id;
            _context2.next = 3;
            return _redisdb.client.get('getSingleNote');

          case 3:
            value = _context2.sent;
            data = JSON.parse(value);

            if (id == data._id) {
              res.status(200).json({
                code: 200,
                data: data,
                message: 'Note fetched successfully from redis'
              });
            } else {
              next();
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function redisCheckSingleNote(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.redisCheckSingleNote = redisCheckSingleNote;