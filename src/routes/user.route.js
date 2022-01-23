import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Register
router.post('/register', newUserValidator, userController.newUser)

//login
router.post("/login", userController.login);

//forget password
router.post("/forgetpassword",userController.forgetpassword)

//Reset password
router.put("/resetpassword",userAuth,userController.resettpassword)


export default router;
