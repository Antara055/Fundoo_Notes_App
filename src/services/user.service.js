import User from '../models/user.model';
const mailer = require("../middlewares/nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import logger, { logStream } from '../config/logger';



//Register
export const newUser = async (body) => {
  const hashedPassWord = await bcrypt.hash(body.password, 10);
  body.password = hashedPassWord;
  const data = await User.create(body);
  return data;
};

//login
export const loggedin = async (body) => {
  const findData = await User.findOne({
    email: body.email
  });
  if (findData) {
    const passworkCheck = await bcrypt.compare(body.password, findData.password)
    if (passworkCheck) {
      const secretKey = process.env.secretkey;
      const payload = { id: findData._id, email: findData.email };
      const token = await jwt.sign(payload, secretKey)
      logger.info(`Login token  ${token}`);
      return new Promise((resolve, reject) => {
        resolve({
            UserDetails: {
                userId: findData._id,
                firstname: findData.firstName,
                lastname: findData.lastName,
                email: findData.email,
                createdAt: findData.createdAt,
                token: token
            }
          })
        })
    }
    else {
      return new Promise((resolve, reject) => {
        reject("worng entry");
        //throw new err("wrong entry");
      }
      )
    }
  }
  else {
    return new Promise((resolve, reject) => {
      reject("worng entry");
    })
  }
};

//Forget Password
export const forgetpassword = async (req, res) => {
  const findEmail = await User.find({ email: req.email });
  if (findEmail.length) {
    const newSecretkey = process.env.secretkey;
    const payload = req.email;
    const newtoken = jwt.sign(payload, newSecretkey)
    logger.info(`Token for Reset password--${newtoken}`);
    const mail = mailer.mailSend(newtoken);
    return mail;
  } else {
    return new Promise((resolve, reject) => {
      reject("worng entry");
      //throw new err("wrong entry");
    })
  }
};


//Reset password
export const resettpassword = async (req, res, next) => {
  try {
    const findData = await User.findOne({
      email: req.body.email
    });
    if (!findData) {
      return false
    }
    else {
      const newPassword = req.body.password;
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const updatePassword = await User.findOneAndUpdate({ email: req.body.email },
        {
          password: newHashedPassword
        }, { new: true })
      return updatePassword;
    }
    /* else{
      throw new err("wrong entry");
    } */
  }
  catch (error) {
    return ("error")
  }
};
