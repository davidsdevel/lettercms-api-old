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
    this.headers = {
      get: name => this.__get(name, this.headers)
    };
    this._status = null;
    this.response = null;
  }
  __get(e, obj) {
      const names = Object.keys(obj);

        let match = '';
        for(let name of names) {
          const h = new RegExp(e, 'i');

          if (h.test(name)) {
            match = name;
            break;
          }
        }

      return obj[match];
  }
  __request(req) {
    const headers = {}
    
    Object.entries(req.headers).forEach(e => {
      headers[e[0].toLowerCase()] = e[1];
    });

    this._route({
      ...req,
      headers,
      get: name => this.__get(name, this.headers)
    }, this);
  }
  __setRoute(route) {
    this._route = route;
  }
  async __resolve() {
    const {
      headers,
      _status,
      response
    } = this;

    await mongoose.disconnect()

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

  return new Promise((resolve, reject) => {
    try {

      const fake = new FakeServer(resolve);

      fake.__init();

      fake.__setRoute(route);

      fake.__request(req); 
    } catch(err) {
      reject(err)
    }
  });
}
