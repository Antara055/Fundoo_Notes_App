import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

//Register
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registerd successfully'
    });
  } catch (error) {
    next(error);
  }
};

//login
export const login = async (req, res, next) => {
  try {
    const data = await UserService.loggedin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "Successfully logged in"
    });
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: "Login failed"
    })
    next(error);
  }
};

//Forget password
export const forgetpassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetpassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Mail Sent'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: "email not registered"
    })
    next(error);
  }
};

//Reset password
export const resettpassword = async (req, res, next) => {
  try {
    const data = await UserService.resettpassword(req);
    if (!data) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: data,
        message: 'email not found'
      });
    }
    else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Reset Password successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};

