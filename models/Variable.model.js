const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    }
});

const Variable = mongoose.model('Variable', variableSchema);