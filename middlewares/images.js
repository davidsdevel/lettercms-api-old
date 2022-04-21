const router = require('express').Router();

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
}

const accounts = handlers => router
  .all('/api/image/:id', mapQueries, handlers['/api/image/:id']);

module.exports = accounts;
