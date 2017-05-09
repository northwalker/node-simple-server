const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// const indexRoutes = require('./routes/index');
// const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');


app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRoutes);
// app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);

app.get('/test', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json({
    "message": "Hello from server, Test OK.",
    "date": new Date().toJSON()
  }).end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err).end()
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
