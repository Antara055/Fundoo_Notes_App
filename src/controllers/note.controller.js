import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
   * Controller to create a new note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
 export const addNote = async (req, res, next) => {
    try {
      const data = await NoteService.newNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getAllNotes = async (req, res, next) => {
    try {
      const data = await NoteService.getAllNotes(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller to get a single note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const getNote = async (req, res, next) => {
    try {
      const data = await NoteService.getNote(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  
  /**
   * Controller to update a note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Controller to delete a note
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
  export const deleteNote = async (req, res, next) => {
    try {
      await NoteService.deleteNote(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  //

  export const isArchived=async(req,res)=>{
    try {
      const data= await NoteService.isArchived(req.body);
      res.status(HttpStatus.OK).json({
        code:HttpStatus.OK,
        data:data,
        message:"Fetched Archived Notes Sucessfully"
      })
    } catch (error) {
      next(error);
    }
  }

  export const isDelete = async(req,res)=>{
    try {
      const data = await NoteService.isDelete(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Fetched Deleted Notes Sucessfully"
      })
    } catch (error) {
      next(error);
    }
  }

  
  
  