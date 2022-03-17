const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { ormErrorHandler, logErrors, errorHandler } = require('./utils/middlewares/errorHandlers');

const app = express();
const port = process.env.PORT || 3002;


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
