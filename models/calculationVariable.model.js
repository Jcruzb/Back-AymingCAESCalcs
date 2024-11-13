const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calculationVariableSchema = new Schema({
    file: {
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    formula: {
        type: String,
        required: true
    },
    dependencies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Variable'
        }
    ]
});

const CalculationVariable = mongoose.model('CalculationVariable', calculationVariableSchema);

module.exports = CalculationVariable;