const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
  code: {
    type:String,
    required:true,
    unique:true
  },
  name: {
    type:String,
    required:true
  },
  version: {
    type:String,
    required:true
  },
  requirements: {
    type:String
  },
  application: {
    type:String
  },
  energySaving:{
    type:Number
  },
  variables: [
    {
      type:Schema.Types.ObjectId,
      ref:'Variable',
      default:[]
    }
  ],
  associatedTables: [
    {
      type:Schema.Types.ObjectId,
      ref:'Table',
      default:[]
    }
  ],
  documents: [
    {
      name: { type: String },
      url: { type: String }
    }
  ],
  status: {
    type:String,
    enum:['borrador', 'activa', 'descontinuada'],
    default:'borrador'
  },
  Sector:{
    type: Schema.Types.ObjectId,
    ref:'Sector'
  },
  duration:{
    type:Number,
    default:0
  },
  creationDate:{
    type:Date,
    default:Date.now
  },
  modificationDate:{
    type:Date,
    default:Date.now
  }
});


const File = mongoose.model('File', fileSchema);

module.exports = File;
