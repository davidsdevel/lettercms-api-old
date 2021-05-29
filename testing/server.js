const app = require('../index');

class Server {
  constructor() {
    this.server = null;
    this.isConnected = false;
  }
  async connect() {
    return new Promise((resolve, reject) => {
      this.server = app.listen(3009, err => {
        if (err)
          return reject(err);

        this.isConnected = true;

        resolve();
      })
    })
  }
  async connect() {
    return new Promise((resolve) => {
      this.server.close(() => {
        this.isConnected = false;
        resolve();
      });
    });
  }
}

module.exports = Server;
