const router = require('express').Router();

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
}

const accounts = handlers => {
  return router
    .all('/api/social/:social', mapQueries, (req, res, next) => {
      if (req.query.social === 'facebook' || req.query.social === 'instagram')
        return handlers['/api/social/:social'](req, res);

      return next();
    })
    .all('/api/social/:social/publish', mapQueries, (req, res, next) => {
      if (req.query.social === 'facebook' || req.query.social === 'instagram')
        return handlers['/api/social/:social/publish'](req, res);

      return next();
    });
}

module.exports = accounts;
