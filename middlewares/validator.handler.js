const boom = require('@hapi/boom');

// como no va a ser de tipo error sino un Middleware normal no pasamos el parametro err
//Esto va a ser un middleware dinamico por lo que tampoco va a recibir req, res, next
function validatorHandler(schema, property) {
  //Creamos un Closure, que creara un Middleware de forma dinamica en el retorno
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); //El abortEarly nos envia todos los errores de una vez

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
