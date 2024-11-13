const CalculationVariable = require('../models/calculationVariable.model');
const File = require('../models/File.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.createCalculationVariable = (req, res, next) => {
    const body = req.body;

    console.log(body);

    const calculationVariable = new CalculationVariable(body);
    calculationVariable.save()
        .then((calculationVariable) => {
            console.log(calculationVariable)
            return File.findByIdAndUpdate(
                body.file, // ID de la ficha asociada
                { $push: { calculationVariables: calculationVariable._id } }, // Agregar la variable de cálculo creada
                { new: true }
            );
        })
        .then((file) => {
            if (!file) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha asociada');
            }
            res.status(StatusCodes.CREATED).json({ message: 'Variable de cálculo creada y vinculada a la ficha', calculationVariable });
        })
        .catch((err) => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al crear y vincular la variable de cálculo'));
        });
};

module.exports.getCalculationVariables = (req, res, next) => {
    CalculationVariable.find()
        .then(calculationVariables => {
            res.status(StatusCodes.OK).json(calculationVariables);
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener las variables de cálculo'));
        });
};

module.exports.getCalculationVariable = (req, res, next) => {
    const id = req.params.id;

    CalculationVariable.findById(id)
        .then(calculationVariable => {
            if (!calculationVariable) {
                console.log('Variable de cálculo no encontrada');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la variable de cálculo'));
            } else {
                res.status(StatusCodes.OK).json(calculationVariable);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener la variable de cálculo'));
        });
};

module.exports.editCalculationVariable = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    CalculationVariable.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(calculationVariable => {
            if (!calculationVariable) {
                console.log('Variable de cálculo no encontrada');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la variable de cálculo'));
            } else {
                res.status(StatusCodes.OK).json(calculationVariable);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al editar la variable de cálculo'));
        });
};

module.exports.deleteCalculationVariable = (req, res, next) => {
    const id = req.params.id;

    CalculationVariable.findByIdAndRemove(id)
        .then((calculationVariable) => {
            if (!calculationVariable) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la variable de cálculo');
            }
            return File.findByIdAndUpdate(
                calculationVariable.file, // ID de la ficha asociada
                { $pull: { calculationVariables: id } }, // Eliminar la variable de cálculo de la lista
                { new: true }
            );
        })
        .then((file) => {
            if (!file) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha asociada');
            }
            res.status(StatusCodes.OK).json({ message: 'Variable de cálculo eliminada y quitada de la ficha', file });
        })
        .catch((err) => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al eliminar la variable de cálculo'));
        });
};

module.exports.getCalculationVariablesByFile = (req, res, next) => {
    const fileId = req.params.fileId;

    CalculationVariable.find({ file: fileId })
        .then(calculationVariables => {
            if (!calculationVariables || calculationVariables.length === 0) {
                return next(createError(StatusCodes.NOT_FOUND, 'No se encontraron variables de cálculo para la ficha especificada'));
            }
            res.status(StatusCodes.OK).json(calculationVariables);
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener las variables de cálculo'));
        });
};