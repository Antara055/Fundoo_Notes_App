import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Register
router.post('/register', newUserValidator, userController.newUser);

//login
router.post("/login", userController.login);

//forget password
router.post("/forgetpassword",userController.forgetpassword)

//Reset password
router.put("/resetpassword",userAuth,userController.resettpassword)

//route to get all users
//router.get('/getall',userAuth, noteController.getAllNotes);

//route to create a new user
//router.post("/createNote",userAuth,noteController.addNote);


//route to get a single user by their user id
//router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
//router.put('/:_id',userAuth, userController.updateUser);

//route to delete a single user by their user id
//router.delete('/:_id', userController.deleteUser);

export default router;
