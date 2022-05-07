var express = require('express');
const helmet = require("helmet");
var app = express();
var morgan = require('morgan');
const errors = require('./lib/error');
const errorModel = require('./lib/errorResponse');
const isError = true;
require('dotenv').config();
var compression = require('compression');
var router = express.Router();
var rootRouter = require('./app/routes/index')(router);
var cors = require('cors');
var dbConfiguration = require('./app/config/DB');
const bodyParser = require('body-parser');

//middleware
app.use(cors({allowedHeaders : "*"}));
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', rootRouter);


app.get('/', (req, res, next) => {
  if (!isError) {
    res.send({ "hellow": "World" });
  }
  let error = new errorModel.errorResponse(errors.invalid_operation.withDetails('Event with given title is already created'));
  res.send(error);
});

app.use((error, req, res, next) => {
    // console.log("in here for general error", error)
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    })
  })


dbConfiguration();

module.exports = app;