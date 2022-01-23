"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.trashNote = exports.newNote = exports.isDelete = exports.isArchived = exports.getNote = exports.getAllNotes = exports.deleteNote = exports.archieveNote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redisdb = require("../config/redisdb");

var _note = _interopRequireDefault(require("../models/note.model"));

//create new notes
var newNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var noteModel;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            noteModel = new _note["default"]({
              userId: req.data.id,
              userEmail: req.data.email,
              title: req.title,
              description: req.description,
              color: req.color,
              isArchived: false,
              isDeleted: false
            });
            _context.next = 3;
            return noteModel.save();

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function newNote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //get all notes


exports.newNote = newNote;

var getAllNotes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _note["default"].find({
              userId: req.data.id,
              isArchived: false,
              isDeleted: false
            });

          case 2:
            data = _context2.sent;

            if (!data) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return _redisdb.client.set('getAllNotes', JSON.stringify(data));

          case 6:
            return _context2.abrupt("return", data);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllNotes(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //get single node by Id


exports.getAllNotes = getAllNotes;

var getNote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_id) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _note["default"].findOne({
              _id: _id
            });

          case 2:
            data = _context3.sent;

            if (!data) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return _redisdb.client.set('getSingleNote', JSON.stringify(data));

          case 6:
            return _context3.abrupt("return", data);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNote(_x5) {
    return _ref3.apply(this, arguments);
  };
}(); //update single notes


exports.getNote = getNote;

var updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var previousData, updatData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _note["default"].find({
              _id: req.id
            });

          case 2:
            previousData = _context4.sent;
            _context4.next = 5;
            return _note["default"].updateOne({
              _id: req.id
            }, {
              title: req.title ? req.title : previousData[0].title,
              description: req.description ? req.description : previousData[0].description,
              color: req.color ? req.color : previousData[0].color,
              isArchived: req.isArchived ? req.isArchived : previousData[0].isArchived,
              isDeleted: req.isDeleted ? req.isDeleted : previousData[0].isDeleted
            }, {
              "new": true
            });

          case 5:
            updatData = _context4.sent;
            return _context4.abrupt("return", updatData);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateNote(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}(); //archieve a note


exports.updateNote = updateNote;

var archieveNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: req.id
            }, {
              $set: {
                isArchived: true
              }
            }, {
              "new": true
            });

          case 2:
            data = _context5.sent;
            return _context5.abrupt("return", data);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function archieveNote(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}(); //trash a note


exports.archieveNote = archieveNote;

var trashNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _note["default"].findByIdAndUpdate({
              _id: req.id
            }, {
              $set: {
                isDeleted: true,
                isArchived: false
              }
            }, {
              "new": true
            });

          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function trashNote(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}(); //delete single notes


exports.trashNote = trashNote;

var deleteNote = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _note["default"].findByIdAndDelete({
              _id: req.id
            });

          case 2:
            data = _context7.sent;
            return _context7.abrupt("return", '');

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteNote(_x12) {
    return _ref7.apply(this, arguments);
  };
}(); //fetched archive note


exports.deleteNote = deleteNote;

var isArchived = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(body) {
    var archivedNotes;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _note["default"].find({
              userId: body.data.id,
              isArchived: true
            });

          case 2:
            archivedNotes = _context8.sent;
            return _context8.abrupt("return", archivedNotes);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function isArchived(_x13) {
    return _ref8.apply(this, arguments);
  };
}(); //fetched trash note


exports.isArchived = isArchived;

var isDelete = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(body) {
    var deletedNote;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _note["default"].find({
              userId: body.data.id,
              isDeleted: true
            });

          case 2:
            deletedNote = _context9.sent;
            return _context9.abrupt("return", deletedNote);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function isDelete(_x14) {
    return _ref9.apply(this, arguments);
  };
}();

exports.isDelete = isDelete;