const router = require('express').Router();

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
};

const payment = handlers => router
  .all('/api/payment/order/:id', mapQueries, handlers['/api/payment/order/:id'])
  .all('/api/payment/order/:id/capture', mapQueries, handlers['/api/payment/order/:id/capture']);

module.exports = payment;
