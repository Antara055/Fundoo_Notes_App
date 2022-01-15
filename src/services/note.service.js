import Note from '../models/note.model';

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
  console.log(req)
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
  const previousData = await Note.find({
    _id: req.id
  });
  console.log(previousData)
  const updatData = await Note.updateOne({_id:req.id},{
  title:req.title?req.title:previousData[0].title,
  description:req.description?req.description:previousData[0].description,
  color:req.color?req.color:previousData[0].color,
  isArchived:req.isArchived?req.isArchived:previousData[0].isArchived,
  isDeleted:req.isDeleted?req.isDeleted:previousData[0].isDeleted
  },{new:true});
  return updatData
}

//delete single notes
  export const deleteNote = async (req) => {
  const data= await Note.findByIdAndDelete({_id:req.id})
  return '';
  };
  
  //fetched archive note
  export const isArchived=async (body)=>{
    const archivedNotes=await Note.find({userId:body.data.id,isArchived:true});
    return archivedNotes;
  }

  //fetched deleted note
  export const isDelete=async (body)=>{
    const deletedNote=await Note.find({userId:body.data.id,isDeleted:true});
    return deletedNote;
  }
