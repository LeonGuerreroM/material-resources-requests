const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { ormErrorHandler, logErrors, errorHandler, boomErrorHandler } = require('./utils/middlewares/errorHandlers');

const app = express();
const port = process.env.PORT || 3002;

  /**
   * @file Main page | Application done for managing the material resources requests occurred on a university
   * @author León Mora Guerrero -LeonGuerreroM-
   * @see <a href="https://github.com/LeonGuerreroM/material-resources-requests/tree/development" target="-blank">See project code</a>
   */

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('Access denied'));
    }
  }
}
app.use(cors(options));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send("Solicitud de recursos materiales");
})

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log("listening on port " + port);
})
