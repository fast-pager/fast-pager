const path = require('path');
const assert = require('assert');
const Builder = require('./Builder');
const Fetcher = require('./Fetcher');

function Context(storagePath, key) {
  this._storagePath = storagePath;
  this._key = key;
}

Context.prototype.from = function(callback) {
  return new Builder(this, callback);
};

Context.prototype.at = function(pageNum) {
  assert(Number.isInteger(pageNum))
  assert(pageNum > 0);
  return new Fetcher(this, pageNum);
};

Context.prototype.getPrefix = function() {
  return path.join(this._storagePath, this._key);
};

module.exports = Context;
