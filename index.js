const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

//Middleware Nativo de Express
//Se utiliza para recibir data en formate json desde los post
app.use(express.json());
app.use(cors());

routerApi(app);

//Los Middlewares se setean luego del routerApi
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//Execute server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
