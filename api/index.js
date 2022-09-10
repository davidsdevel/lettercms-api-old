const pathToRegexp = require('path-to-regexp');
const manifest = require('../manifest.json');

module.exports = (res, res) => {
  const params = {}
  let handler = '';

  manifest.forEach(({url, file}) => {
    const keys = []
    
    const r = pathToRegexp(url, keys);
    const match = r.exec(req.pathname);
    
    if (!match)
      return

    for (var i = 1; i < match.length; i++) {
      var key = keys[i - 1];
      var prop = key.name;

      var val = match[i]

      if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
        params[prop] = match[i];
      }
    }

    handler = file;
  });

  req.query = Object.assign({}, req.query, params);

  return require(handler)(req, res);
}
