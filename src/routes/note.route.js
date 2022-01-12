import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all notes
router.get('/getall',userAuth, noteController.getAllNotes);

//route to create a new note
router.post("/createNote",userAuth,noteController.addNote);

//route to get a single note by their user id
router.get('/getone:_id', userAuth, noteController.getNote);

//route to update a single note by their user id
router.put('/updatenote:_id',userAuth, noteController.updateNote);

//route to delete a single note by their user id
router.delete('/deletenote:_id',userAuth, noteController.deleteNote);

//is archive
router.get("/isArchived", userAuth, noteController.isArchived);

//is delete
router.get("/isDelete", userAuth, noteController.isDelete);


export default router;
