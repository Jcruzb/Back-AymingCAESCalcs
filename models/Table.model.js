//Table model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    file: { 
        type: Schema.Types.ObjectId, 
        ref: 'File' 
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    columns: [
        {
            name: String,
            type: String,
            required: Boolean,
            unique: Boolean,
            default: null
        }
    ],
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
    