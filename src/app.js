const express = require('express');
const morgan = require('morgan');

//routes
const userRoutes = require('./routes/user.route');
const trasferRoutes = require('./routes/transfer.route');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//routes created
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transfers', trasferRoutes);

module.exports = app;
