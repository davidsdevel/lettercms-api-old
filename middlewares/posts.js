const router = require('express').Router();

const postsRoutes = [
  'exists',
  'import',
  'search'
];

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
};

const posts = handlers => router
  .all('/api/post/:year/:month/:day/:url', mapQueries, handlers['/api/post/:year/:month/:day/:url'])
  .all('/api/post/:year/:month/:url', mapQueries, handlers['/api/post/:year/:month/:url'])
  .all('/api/post/:category/:url', mapQueries, handlers['/api/post/:category/:url'])
  .all('/api/post/:url', mapQueries, (req, res, next) => {
    if (postsRoutes.indexOf(req.query.url) === -1)
      return handlers['/api/post/:url'](req, res);
    
      return next();
  });

module.exports = posts;
