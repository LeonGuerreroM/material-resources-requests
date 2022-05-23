const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { ormErrorHandler, logErrors, errorHandler, boomErrorHandler } = require('./utils/middlewares/errorHandlers');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://cosmic-hamster-644022.netlify.app/'];
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
