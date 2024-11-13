const Variable = require('../models/Variable.model');
const File = require('../models/File.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.createVariable = (req, res, next) => {
    const body = req.body;

    console.log(body);

    const variable = new Variable(body);
    variable.save()
        .then((variable) => {
            return File.findByIdAndUpdate(
                body.file, // ID de la ficha asociada
                { $push: { variables: variable._id } }, // Agregar la variable creada
                { new: true }
            );
        })
        .then((file) => {
            if (!file) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha asociada');
            }
            res.status(StatusCodes.CREATED).json({ message: 'Variable creada y vinculada a la ficha', file });
        })
        .catch((err) => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al crear y vincular la variable'));
        });
};

module.exports.getVariables = (req, res, next) => {
    Variable.find()
        .then(variables => {
            res.status(StatusCodes.OK).json(variables);
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener las variables'));
        });
};

module.exports.getVariable = (req, res, next) => {
    const id = req.params.id;

    Variable.findById(id)
        .then(variable => {
            if (!variable) {
                console.log('Variable not found');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la variable'));
            } else {
                res.status(StatusCodes.OK).json(variable);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener la variable'));
        });
};

module.exports.editVariable = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    Variable.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(variable => {
            if (!variable) {
                console.log('Variable not found');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la variable'));
            } else {
                res.status(StatusCodes.OK).json(variable);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al editar la variable'));
        });
};

module.exports.deleteVariable = (req, res, next) => {
    const id = req.params.id;

    Variable.findByIdAndRemove(id)
        .then((variable) => {
            if (!variable) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la variable');
            }
            return File.findByIdAndUpdate(
                variable.file, // ID de la ficha asociada
                { $pull: { variables: id } }, // Eliminar la variable de la lista
                { new: true }
            );
        })
        .then((file) => {
            if (!file) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha asociada');
            }
            res.status(StatusCodes.OK).json({ message: 'Variable eliminada y quitada de la ficha', file });
        })
        .catch((err) => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al eliminar la variable'));
        });
};

module.exports.getVariablesByFile = (req, res, next) => {
    const fileId = req.params.fileId;

    Variable.find({ file: fileId })
        .then(variables => {
            if (!variables || variables.length === 0) {
                return next(createError(StatusCodes.NOT_FOUND, 'No se encontraron variables para la ficha especificada'));
            }
            res.status(StatusCodes.OK).json(variables);
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener las variables'));
        });
};