const { ValidationError } = require('sequelize');

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) { //eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

/*function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}*/

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) { //en caso de que sea de tipo validación de bd
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}


module.exports = { logErrors, errorHandler, ormErrorHandler }
