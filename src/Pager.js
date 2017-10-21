const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const Context = require('./Context');

function Pager(storagePath) {
  this._storagePath = storagePath;
}

Pager.prototype.for = function(key) {
  return new Context(this._storagePath, key);
}

module.exports = Pager;
