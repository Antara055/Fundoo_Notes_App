"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;

/* import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
}; */
var joi = require("joi");

var newUserValidator = function newUserValidator(req, res, next) {
  var data = joi.object({
    firstName: joi.string().min(3).max(25).trim(true).required(),
    lastName: joi.string().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required()
  });
  var vres = data.validate(req.body);

  if (vres.error) {
    return res.status(400).send({
      success: false,
      message: vres.error.details[0].message
    });
  } else {
    req.validatedBody = vres;
    next();
  }
};

exports.newUserValidator = newUserValidator;