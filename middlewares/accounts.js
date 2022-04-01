const accountsRoutes = [
  'collaborator',
  'exists',
  'invitation',
  'login',
  'me',
  'verify'
];

const accounts = handlers => (req, res, next) => {
  if (req.query.emailHex) {
    if (accountsRoutes.indexOf(req.query.emailHex) === -1)
      return handlers['/api/account/:emailHex'](req, res);
  }

  return next();
}

module.exports = accounts;