const router = require('express').Router();

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
}

const images = handlers => router
  .all('/api/image/:id', mapQueries, (req, res) => handlers['/api/image/:id'](req, res));

module.exports = images;
