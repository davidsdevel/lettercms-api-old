const accounts = handlers => (req, res, next) => {
  if (/\/api\/social\/(facebook|instagram)\/publish/.test(req.path))
    return handlers['/api/social/:social/post'];

  if (/\/api\/social\/(facebook|instagram)/.test(req.path))
    return handlers['/api/social/:social'];

  return next();
}

module.exports = accounts;
