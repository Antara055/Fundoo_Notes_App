import { getNotes } from '../controllers/note.controller';
import Note from '../models/note.model';
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


//create new notes
export const newNote = async (req,res) => {
  const noteModel=new Note({
      userId:req.data.id,
      userEmail:req.data.email,
      title:req.title,
      description:req.description,
      color:req.color, 
      isArchived:req.isArchived,
      isDeleted:req.isDeleted
  })
  return await noteModel.save(); 
}  /*
  const data = await Note.create(body);
  return data; 
  */

//get all notes
export const getAllNotes = async (req,res) => {
    const data = await Note.find({userId:req.data.id});
    return data;
};

//get single node by Id
export const getNote=async(req,res)=>{
  const data=await Note.findOne({_id:req.id});
  return data;
}

//update single notes
export const updateNote = async(req,res)=>{
  //console.log(req.data)
  const previousData = await Note.find({
    _id: req.id
  });
  const updatData = await Note.updateOne({_id:req.id},{
  title:req.title?req.title:previousData.title,
  description:req.description?req.description:previousData.description,
  color:req.color?req.color:previousData.color,
  isArchived:req.isArchived?req.isArchived:previousData.isArchived,
  isDeleted:req.isDeleted?req.isDeleted:previousData.isDeleted
  },{new:true});
  return updatData
}

//delete single notes
  export const deleteNote = async (req) => {
    console.log(req)
  const data=await Note.findOne({_id:req.id});
  console.log(data)
  await Note.deleteOne({_id:req.id});
  return '';
  };
  
