const path = require('path');

class Context {
  constructor(storagePath, key) {
    this._storagePath = storagePath;
    this._key = key;
  }

  from(callback) {
    return new Builder(this, callback);
  }

  at(pageNum) {
    return new Fetcher(this, pageNum);
  }

  getPrefix() {
    return path.join(this._storagePath, this._key);
  }
}

module.exports = Context;
