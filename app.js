var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
const { userRouter } = require('./routes/UserRouter');
const { notificationRouter } = require('./routes/NotificationRouter');
const { handleResponse } = require('./util/CustomResponse');
const { curriculumRouter } = require('./routes/CurriculumRouter');
const { inboxRouter } = require('./routes/InboxRouter');
require('dotenv').config();

// Routes

const app = express();
const server = require('http').createServer(app);

// Middlewares per each request

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for specific endpoint
app.use('/users', userRouter);
app.use('/notifications', notificationRouter)
app.use('/curriculum', curriculumRouter);
app.use('/inbox', inboxRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(handleResponse(404, {}, 'Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).send(handleResponse(err.status || 500, err.payload, err.error || 'Internal server error'));
});

const PORT = process.env.PORT || 3002

server.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
})