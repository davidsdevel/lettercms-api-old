const pagesRoutes = [
  'exists'
];

const pages = handlers => (req, res, next) => {
  if (req.query.url) {
    if (pagesRoutes.indexOf(req.query.url) === -1)
      return handlers['/api/page/:url'](req, res);
  }

  if (req.query._id)
    return handlers['/api/page/grapes/:_id'](req, res);

  return next();
}

module.exports = pages;
