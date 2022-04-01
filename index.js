const {version} = require('./package.json');
global.mongo = require('mongoose');

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const express = require('express');
const app = express();
const debug = require('debug');

const generateRoutes = require('./lib/generateRoutes');
const importHandlers = require('./lib/importHandlers');

const accountsMiddleware = require('./middlewares/accounts');

const routerDebug = debug('router');
const queryDebug = debug('query');
const bodyDebug = debug('body');
const debugResponse = debug('response');
const debugServer = debug('server');

const routesPath = generateRoutes();
const routesHandlers = importHandlers(routesPath);

app
  .use(express.urlencoded({ extended: true }))
	.use(express.json())
	.use((req, res, next) => {
    req.query = Object.assign({}, req.query, req.params);
		res.old_json = res.json;

    res.json = resp => {
      debugResponse(resp);
      return res.old_json(resp);
    }

    routerDebug(req.method + ' - ' + req.url);
    bodyDebug(req.body);
    queryDebug(req.query);

    next()
	})
	.get('/', (req, res) => res.send(version))
	.all('*', (req, res, next) => {
		if (req.methods === 'OPTIONS') {
			const origin = req.get('origin');

	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	    res.header("Access-Control-Allow-Origin", origin);
	    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	    res.header("Access-Control-Allow-Credentials", "true");

	    return res.sendStatus(200);
		}
		return next();

	},
  accountsMiddleware(routesHandlers), 
	(req, res) => {
    if (Object.keys(routesHandlers).indexOf(req.url) === -1)
		  return res.sendStatus(404);//TODO: Create not found status

    return routesHandlers[req.url](req, res);

	});



module.exports = app;