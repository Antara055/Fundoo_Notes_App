import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheck, redisCheckSingleNote } from '../middlewares/redis.middleware';

const router = express.Router();

//route to create a new note
router.post("",userAuth,noteController.addNote);

//route to get all notes
router.get('/',userAuth, redisCheck, noteController.getAllNotes);

//route to get a single note by their user id
router.get('/:_id', userAuth,redisCheckSingleNote, noteController.getNote);

//route to update a single note by their user id
router.put('/note:_id',userAuth, noteController.updateNote);

//route to archieve a single note by their note id
router.put('/archieve/_id', userAuth, noteController.archieveNote);

//route to trash a single note by their note id
router.put('/trash/_id', userAuth, noteController.trashNote);

//route to delete a single note by their user id
router.delete('/note_id',userAuth, noteController.deleteNote);

//fetched all archive note
router.get("/note/isArchived", userAuth, noteController.isArchived);

//fetched all delete delete
router.get("/note/isDelete", userAuth, noteController.isDelete);


export default router;
