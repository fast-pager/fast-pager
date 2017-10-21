const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

class Pager {
  constructor(storagePath) {
    this._storagePath = storagePath;
  }

  for(key) {
    return new Context(this._storagePath, key);
  }
}

module.exports = Pager;
