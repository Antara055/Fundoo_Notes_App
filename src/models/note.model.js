import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
  userId:{
    type:String,
  },
  userEmail:{
    type:String,
  },
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  color: {
    type: String,
  },
  isArchived: {
    type: Boolean,
  },
  isDeleted: {
    type: Boolean,
  }
},
{
  timestamps: true
}
);

export default model('Note', noteSchema);
