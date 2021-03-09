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
    this.headers[name] = value;
  }

  __init() {
    this.headers = {};
    this._status = null;
    this.response = null;
  }
  __request(req) {
    this._route(req, this);
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

    this.promiseResolve({
      headers,
      status: _status,
      response
    });
  }

}

exports.fakeServer = (route, req) => {
  if (req.method === 'GET' && !req.query)
    req.query = {};
  if (!req.headers)
    req.headers = {};

  return new Promise((resolve, reject) => {
    const fake = new FakeServer(resolve);

    fake.__init();

    fake.__setRoute(route);

    fake.__request(req); 
  });
}
