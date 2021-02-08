var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var routes = require('./routes/api');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/PEI2020', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});

var app = express();

app.use(function(req, res, next){
  if(req.originalUrl != '/api/token'){
    var myToken = req.query.token || req.body.token
    if(myToken){
      jwt.verify(myToken, "DAW-PRI-2020-recurso", function(err, decoded) {
        if (err) {
          return res.status(500).json({ auth: false, message: 'Falha ao autenticar myToken.' });
        }
        req.sub_info = decoded.sub;
        req.data_info = decoded.data;
        console.log("sub:" +req.sub_info +", data: " + req.data_info)
        next();
      })
    }
    else
      return res.status(401).json({ auth: false, message: 'Nenhum myToken foi provided.' });
  }
  else next()
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/api', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).jsonp({error: err.message})
});



module.exports = app;