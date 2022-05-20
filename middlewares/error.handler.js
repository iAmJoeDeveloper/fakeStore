function logErrors(err, req, res, next) {
  console.log(err);
  next(err); // Cuando ejecutamos el next sin parametro sera un middleware normal, si tiene parametro es de tipo error
}

//Asi no vayamos a utilizar next hay que ponerlo para que detecte que es un middleware de tipo error
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack, // En donde ocurrio el error
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
