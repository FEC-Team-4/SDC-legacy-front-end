/* eslint-disable no-console */
const compression = require('compression');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dependencies = ['bootstrap', 'jquery', '@popperjs/core'];


const { routeProducts, routeQA, routeReviews, outfit } = require('./routes/index');


const { TOKEN } = require('../config.js');


const app = express();
app.use(compression());

const port = 3000;
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/products', routeProducts);
app.use('/api/QA', routeQA);
dependencies.forEach(dep => {
  app.use(`/${dep}`, express.static(path.resolve(`node_modules/${dep}`)));
});
app.use('/api/reviews', routeReviews);
app.use('/api/outfit', outfit);



app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

module.exports = app;