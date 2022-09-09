const {version} = require('./package.json');
global.mongo = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  var Module = require('module');
  
  require('dotenv').config();
  
  var originalRequire = Module.prototype.require;

  Module.prototype.require = function() {
    const str = arguments[0]

    if (str.startsWith('@lettercms'))
      arguments[0] = str.replace('@lettercms', process.cwd());

    return originalRequire.apply(this, arguments)
  }
}

const PORT = process.env.PORT || 3009;

const express = require('express');
const app = express();
const cors = require('cors');
const debug = require('debug');
const importHandlers = require('./lib/importHandlers');
const generateRoutes = require('./lib/generateRoutes');

const accountsMiddleware = require('./middlewares/accounts');
const pagesMiddleware = require('./middlewares/pages');
const postsMiddleware = require('./middlewares/posts');
const socialMiddleware = require('./middlewares/social');
const commentsMiddleware = require('./middlewares/comments');
const usersMiddleware = require('./middlewares/users');

const routerDebug = debug('router');
const queryDebug = debug('query');
const bodyDebug = debug('body');
const debugResponse = debug('response');

const routesPath = generateRoutes();
const routesHandlers = importHandlers(routesPath);

const corsOpts = {
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  exposedHeaders: 'Authorization'
};

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use((req, res, next) => {
    req.query = Object.assign({}, req.query, req.params);
    res.old_json = res.json;

    res.json = resp => {
      debugResponse(resp);
      return res.old_json(resp);
    };

    routerDebug(req.method + ' - ' + req.url);
    bodyDebug(req.body);
    queryDebug(req.query);

    next();
  })
  .use(cors(corsOpts))
  .get('/', (req, res) => res.send(version));

Object.entries(routesHandlers)
  .sort(e => e[0].includes(':') ? +1 : -1)
  .forEach(([path, handler]) =>
    app.all(path, (req, res, next) => {
      req.query = Object.assign({}, req.query, req.params);
      next();
    }, handler)
  );

app
  .all('*', (req, res) => {
    res.status(404).json({
      status: 'not-found',
      message: `Resource "${req.path}" not found`
    });
  });

module.exports = exports = {
  init: () => app.listen(PORT, () => console.log('Listen'))
};
