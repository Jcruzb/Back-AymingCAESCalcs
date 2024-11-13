// table controller

const Table = require('../models/Table.model');
const File = require('../models/File.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.createTable = (req, res, next) => {
    const body = req.body;

    console.log(body)

    const table = new Table(body);
    table.save()
        .then((table) => {
            return File.findByIdAndUpdate(
                body.file, // ID de la ficha asociada
                { $push: { tables: table._id } }, // Agregar la tabla creada
                { new: true }
            );
        })
        .then((file) => {
            if (!file) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha asociada');
            }
            res.status(StatusCodes.CREATED).json({ message: 'Tabla creada y vinculada a la ficha', file });
        })
        .catch((err) => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al crear y vincular la tabla'));
        });
};

module.exports.getTables = (req, res, next) => {
    Table.find()
        .then(tables => {
            res.status(StatusCodes.OK).json(tables);
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener las tablas'));
        });
};

module.exports.getTable = (req, res, next) => {
    const id = req.params.id;

    Table.findById(id)
        .then(table => {
            if (!table) {
                console.log('Table not found');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la tabla'));
            } else {
                res.status(StatusCodes.OK).json(table);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener la tabla'));
        });
};

module.exports.editTable = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    Table.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(table => {
            if (!table) {
                console.log('Table not found');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la tabla'));
            } else {
                res.status(StatusCodes.OK).json(table);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al editar la tabla'));
        });
};

module.exports.descontinueTable = (req, res, next) => {
    const id = req.params.id;

    Table.findByIdAndUpdate(id, { status: 'descontinuada' }, { new: true })
        .then(table => {
            if (!table) {
                console.log('Table not found');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la tabla'));
            } else {
                res.status(StatusCodes.OK).json(table);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al descontinuar la tabla'));
        });
};

module.exports.deleteTable = (req, res, next) => {
    const id = req.params.id;

    Table.findByIdAndRemove(id)
        .then((table) => {
            if (!table) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la tabla');
            }
            return File.findByIdAndUpdate(
                table.file, // ID de la ficha asociada
                { $pull: { tables: id } }, // Eliminar la tabla de la lista
                { new: true }
            );
        })
        .then((file) => {
            if (!file) {
                throw createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha asociada');
            }
            res.status(StatusCodes.OK).json({ message: 'Tabla eliminada y quitada de la ficha', file });
        })
        .catch((err) => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al eliminar la tabla'));
        });
};