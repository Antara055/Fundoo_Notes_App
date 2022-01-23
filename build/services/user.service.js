"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resettpassword = exports.newUser = exports.loggedin = exports.forgetpassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _logger = _interopRequireWildcard(require("../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var mailer = require("../middlewares/nodemailer");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

//Register
var newUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var hashedPassWord, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.hash(body.password, 10);

          case 2:
            hashedPassWord = _context.sent;
            body.password = hashedPassWord;
            _context.next = 6;
            return _user["default"].create(body);

          case 6:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function newUser(_x) {
    return _ref.apply(this, arguments);
  };
}(); //login


exports.newUser = newUser;

var loggedin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var findData, passworkCheck, secretKey, payload, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            findData = _context2.sent;

            if (!findData) {
              _context2.next = 20;
              break;
            }

            _context2.next = 6;
            return bcrypt.compare(body.password, findData.password);

          case 6:
            passworkCheck = _context2.sent;

            if (!passworkCheck) {
              _context2.next = 17;
              break;
            }

            secretKey = process.env.secretkey;
            payload = {
              id: findData._id,
              email: findData.email
            };
            _context2.next = 12;
            return jwt.sign(payload, secretKey);

          case 12:
            token = _context2.sent;

            _logger["default"].info("Login token  ".concat(token));

            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              resolve({
                UserDetails: {
                  userId: findData._id,
                  firstname: findData.firstName,
                  lastname: findData.lastName,
                  email: findData.email,
                  createdAt: findData.createdAt,
                  token: token
                }
              });
            }));

          case 17:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              reject("worng entry"); //throw new err("wrong entry");
            }));

          case 18:
            _context2.next = 21;
            break;

          case 20:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              reject("worng entry");
            }));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loggedin(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //Forget Password


exports.loggedin = loggedin;

var forgetpassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var findEmail, newSecretkey, payload, newtoken, mail;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].find({
              email: req.email
            });

          case 2:
            findEmail = _context3.sent;

            if (!findEmail.length) {
              _context3.next = 12;
              break;
            }

            newSecretkey = process.env.secretkey;
            payload = req.email;
            newtoken = jwt.sign(payload, newSecretkey);

            _logger["default"].info("Token for Reset password--".concat(newtoken));

            mail = mailer.mailSend(newtoken);
            return _context3.abrupt("return", mail);

          case 12:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              reject("worng entry"); //throw new err("wrong entry");
            }));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgetpassword(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}(); //Reset password


exports.forgetpassword = forgetpassword;

var resettpassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var findData, newPassword, newHashedPassword, updatePassword;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user["default"].findOne({
              email: req.body.email
            });

          case 3:
            findData = _context4.sent;

            if (findData) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", false);

          case 8:
            newPassword = req.body.password;
            _context4.next = 11;
            return bcrypt.hash(newPassword, 10);

          case 11:
            newHashedPassword = _context4.sent;
            _context4.next = 14;
            return _user["default"].findOneAndUpdate({
              email: req.body.email
            }, {
              password: newHashedPassword
            }, {
              "new": true
            });

          case 14:
            updatePassword = _context4.sent;
            return _context4.abrupt("return", updatePassword);

          case 16:
            _context4.next = 21;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", "error");

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));

  return function resettpassword(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resettpassword = resettpassword;