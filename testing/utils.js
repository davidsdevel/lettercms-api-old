const mongoose = require('mongoose')

class FakeServer {
  constructor(resolve) {
    this.headers = {};
    this._status = null;
    this.response = null;
    this._route = null;

    this.promiseResolve = resolve;
  }
  sendStatus(status) {
    this._status = status;

    this.__resolve();
  }
  status(status) {
    this._status = status;

    return this;
  }
  send(text) {
    this.headers = {
      ...this.headers,
      'Content-Type': 'text/plain'
    };

    this._status = this._status || 200;

    this.response = text;

    this.__resolve();

  }
  json(json) {
    this.headers = {
      ...this.headers,
      'Content-Type': 'application/json'
    };

    this._status = this._status || 200;

    this.response = json;

    this.__resolve()

  }
  end() {
    this.__resolve();
  }
  header(name, value) {
    this.headers[name.toLowerCase()] = value;
  }

  __init() {
    this.headers = {};
    this._status = null;
    this.response = null;
  }
  __request(req) {
    const headers = {}
    
    Object.entries(req.headers).forEach(e => {
      headers[e[0].toLowerCase()] = e[1];
    });

    this._route({
      ...req,
      headers,
      get: header => {
        const names = Object.keys(this.headers);

        let match = '';
        for(name of names) {
          const h = new RegExp(header, 'i');

          if (h.test(name)) {
            match = name;
            break;
          }
        }

        return this.headers[match];
      }
    }, this);
  }
  __setRoute(route) {
    this._route = route;
  }
  __resolve() {
    const {
      headers,
      _status,
      response
    } = this;

    mongoose.disconnect()

    this.promiseResolve({
      headers,
      status: _status,
      response
    });
  }
}

exports.fakeServer = (route, req) => {
  if (!req.method)
    req.method = 'GET';

  if (req.method === 'GET' && !req.query)
    req.query = {};

  if (!req.headers)
    req.headers = {};

  return new Promise((resolve) => {
    const fake = new FakeServer(resolve);

    fake.__init();

    fake.__setRoute(route);

    fake.__request(req); 
  });
}
