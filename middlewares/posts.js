const postsRoutes = [
  'exists',
  'import',
  'search'
];

const posts = handlers => (req, res, next) => {
  if (req.query.year && req.query.month && req.query.day)
    return handlers['/api/post/:year/:month/:day/:url'](req, res);
  if (req.query.year && req.query.month)
    return handlers['/api/post/:year/:month/:url'](req, res);
  if (req.query.category) 
    return handlers['/api/post/:category:url'](req, res);

  if (req.query.url) {
    if (postsRoutes.indexOf(req.query.url) === -1)
      return handlers['/api/post/:url'](req, res);
  }

  return next();
}

module.exports = posts;
