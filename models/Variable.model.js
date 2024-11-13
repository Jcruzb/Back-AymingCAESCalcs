const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TYPE = ["Number", "Table", "Calculation"];

const variableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    //siglas
    acronym: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: TYPE,
        required: true
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    tableRef: {
        type: Schema.Types.ObjectId,
        ref: 'Table'
    },
    formula: {
        type: String
    },
    dependencies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Variable'
        }
    ],
    unit: {
        type: String
    },
});

const Variable = mongoose.model('Variable', variableSchema);

module.exports = Variable;
