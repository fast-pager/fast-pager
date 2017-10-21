const path = require('path');
const assert = require('assert');
const Builder = require('./Builder');
const Fetcher = require('./Fetcher');

class Context {
  constructor(storagePath, key) {
    this._storagePath = storagePath;
    this._key = key;
  }

  from(callback) {
    return new Builder(this, callback);
  }

  at(pageNum) {
    assert(isNumeric(pageNum))
    assert(pageNum > 0);
    return new Fetcher(this, pageNum);
  }

  getPrefix() {
    return path.join(this._storagePath, this._key);
  }
}

module.exports = Context;
