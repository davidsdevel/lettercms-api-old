const router = require('express').Router();

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
};

const comments = handlers => router
  .all('/api/comment/:id', mapQueries, handlers['/api/comment/:id']);

module.exports = comments;
