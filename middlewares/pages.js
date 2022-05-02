const router = require('express').Router();

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
}

const pages = handlers => router
  .all('/api/page/:url', mapQueries, (req, res, next) => {
    if (req.query.url === 'exists')
      return next();
      
    return handlers['/api/page/:url'](req, res)
  })
  .all('/api/page/grapes/:_id', mapQueries, handlers['/api/page/grapes/:_id']);

module.exports = pages;
