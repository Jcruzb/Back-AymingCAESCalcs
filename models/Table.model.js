//Table model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    unique: {
        type: Boolean,
        default: false
    }
});

const tableSchema = new Schema({
    file: { 
        type: Schema.Types.ObjectId, 
        ref: 'File',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    columns: [columnSchema],
    rows: [
        [
            {
                type: Schema.Types.Mixed,
                default: null
            }
        ]
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

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;