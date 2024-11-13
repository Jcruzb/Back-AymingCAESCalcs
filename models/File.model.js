const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SECTOR = ["Industrial", "Terciario", "Residencial", "Transporte", "Agrario"];

const fileSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  version: {
    type: Number,
    required: true
  },
  sector: {
    type: String,
    enum: SECTOR,
    required: true,
    default: 'Industrial'
  },
  requirements: {
    type: String
  },
  application: {
    type: String
  },
  tables: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Table',
      default: []
    }
  ],
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
  energySavingCalculation: {
    type: Schema.Types.ObjectId,
    ref: 'CalculationVariable'
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
