"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailSend = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

_dotenv["default"].config("./.env");

var Password = process.env.password_email;

var mailSend = function mailSend(token) {
  var transport = _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: "yashichow.sweet500.dgp14@gmail.com",
      pass: Password
    }
  });

  var mailOption = {
    from: "yashichow.sweet500.dgp14@gmail.com",
    to: "antara.chowdhury500@gmail.com",
    subject: "BridgeLabz:Pasword Reset",
    text: "Hello world?",
    html: "<h2 style=\"color:red\">Reset your password by that link!</h2>\n    <h5>Link :<a href=\"http://localhost:5000/resetPassword\">click</a></h5>".concat(token)
  };
  return new Promise(function (resolve, reject) {
    transport.sendMail(mailOption, function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve({
        token: token
      });
    });
  });
};
/* transport.sendMail(mailOption)
    }
    catch(error){
        next(error)
    }
} */


exports.mailSend = mailSend;