const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server started...');
});

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.all('*', (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;