const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  Sector: {
    type: Schema.Types.ObjectId,
    ref: 'Sector'
  },
  requirements: {
    type: String
  },
  application: {
    type: String
  },
  variables: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Variable',
      default: []
    }
  ],
  associatedTables: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Table',
      default: []
    }
  ],
  documents: [
    {
      description: String,
      obligatory: Boolean,
    }
  ],
  status: {
    type: String,
    enum: ['borrador', 'activa', 'descontinuada'],
    default: 'borrador'
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  modificationDate: {
    type: Date,
    default: Date.now
  }
});


const File = mongoose.model('File', fileSchema);

module.exports = File;
