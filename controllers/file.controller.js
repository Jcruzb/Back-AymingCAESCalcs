//file controller

const File = require('../models/File.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.createFile = (req, res, next) => {
    const body = req.body

    const file = new File(body)
    file.save()
        .then(file => {
            res.status(StatusCodes.CREATED).json(file)
        })
        .catch(err => {
            console.log(err)
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al crear la ficha'))
        })
}

module.exports.getFiles = (req, res, next) => {
    File.find()
        .then(files => {
            res.status(StatusCodes.OK).json(files)
        })
        .catch(err => {
            console.log(err)
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener las fichas'))
        })
}

module.exports.getFile = (req, res, next) => {
    const id = req.params.id

    File.findById(id)
        .populate('tables')
        .populate('variables')
        .then(file => {
            if (!file) {
                console.log('File not found')
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha'))
            } else {
                res.status(StatusCodes.OK).json(file)
            }
        })
        .catch(err => {
            console.log(err)
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener la ficha'))
        })
}


module.exports.editFile = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    console.log(body);

    File.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(file => {
            if (!file) {
                console.log('File not found');
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha'));
            } else {
                res.status(StatusCodes.OK).json(file);
            }
        })
        .catch(err => {
            console.log(err);
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al editar la ficha'));
        });
};


//la ficha no se elimina, sólo se descontinua
module.exports.descontinueFile = (req, res, next) => {
    const id = req.params.id

    File.findByIdAndUpdate(id, { status: 'descontinuada' }, { new: true })
        .then(file => {
            if (!file) {
                console.log('File not found')
                next(createError(StatusCodes.NOT_FOUND, 'No se encontró la ficha'))
            } else {
                res.status(StatusCodes.OK).json(file)
            }
        })
        .catch(err => {
            console.log(err)
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error al descontinuar la ficha'))
        })
}
