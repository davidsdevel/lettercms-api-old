const router = require('express').Router();

const accountsRoutes = [
  'collaborator',
  'exists',
  'invitation',
  'login',
  'me',
  'verify'
];

const mapQueries = (req, res, next) => {
  req.query = Object.assign({}, req.query, req.params);
  next();
};

const accounts = handlers => {
  return router
    .all('/api/account/invitation/:id', mapQueries, handlers['/api/account/invitation/:id'])
    .all('/api/account/:emailHex', mapQueries, (req, res, next) => {
      if (accountsRoutes.indexOf(req.query.emailHex) === -1)
        return handlers['/api/account/:emailHex'](req, res);

      return next();
    });


};

module.exports = accounts;
