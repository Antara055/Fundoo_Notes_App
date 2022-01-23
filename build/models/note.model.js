"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var noteSchema = new _mongoose.Schema({
  userId: {
    type: String
  },
  userEmail: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  isArchived: {
    type: Boolean
  },
  isDeleted: {
    type: Boolean
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', noteSchema);

exports["default"] = _default;