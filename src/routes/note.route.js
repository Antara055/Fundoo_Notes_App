import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all notes
router.get('/',userAuth, noteController.getAllNotes);

//route to create a new note
router.post("",userAuth,noteController.addNote);

//route to get a single note by their user id
router.get('/note_id', userAuth, noteController.getNote);

//route to update a single note by their user id
router.put('/note:_id',userAuth, noteController.updateNote);

//route to delete a single note by their user id
router.delete('/note_id',userAuth, noteController.deleteNote);

//is archive
router.get("/note/isArchived", userAuth, noteController.isArchived);

//is delete
router.get("/note/isDelete", userAuth, noteController.isDelete);


export default router;
