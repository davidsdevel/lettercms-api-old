const pathToRegexp = require('path-to-regexp');
const manifest = require('../manifest.json');
const requireRuntime = require('require-runtime')
const {readdirSync} = require('fs')



module.exports = (req, res) => {
  const base = process.cwd();
  const b = readdirSync('/')

  res.write(JSON.stringify(b));

  return res.end();

  if (!req.url.startsWith('/api/'))
    return res.status(404);

  const params = {}
  let handler = '';

  manifest.forEach(({url, file}) => {
    const keys = []
    
    const r = pathToRegexp(url, keys);
    const match = r.exec(req.url);
    
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

  if (!handler)
    return res.status(404);

  req.query = Object.assign({}, req.query, params);

  return requireRuntime(base + handler)(req, res);
}
