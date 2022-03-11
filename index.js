const express = require('express');
//const cors = require('cors');
//const routerApi = require('./routes')

const app = express();
//const port = process.env.PORT || 3001;
const port = 3002;

app.get('/', (req, res) => {
  res.send("Solicitud de recursos materiales");
})

app.listen(port, () =>{
  console.log("listening on port " + port);
})
