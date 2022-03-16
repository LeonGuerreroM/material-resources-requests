const express = require('express');
//const cors = require('cors');
const routerApi = require('./routes');
const { ormErrorHandler, logErrors, errorHandler } = require('./utils/middlewares/errorHandlers');

const app = express();
//const port = process.env.PORT || 3001;
const port = 3002;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Solicitud de recursos materiales");
})

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log("listening on port " + port);
})
