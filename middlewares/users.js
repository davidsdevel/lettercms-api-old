const router = require('express').Router();

const postsRoutes = [
  'exists',
  'merge'
];

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
};

const users = handlers => router
  .all('/api/user/:id', mapQueries, handlers['/api/user/:id'])
  .all('/api/user/:id/recommendation', mapQueries, handlers['/api/user/:id/recommendation'])
  .all('/api/user/:id/recommendation/:postID', mapQueries, handlers['/api/user/:id/recommendation/:postID']);

module.exports = users;
