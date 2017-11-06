const assert = require('assert');
const Builder = require('./Builder');
const Fetcher = require('./Fetcher');
const StorageFactory = require('./storage/StorageFactory');

function Context(storage, key) {
  this._storage = StorageFactory(storage, key);
  this._key = key;
}

Context.prototype.from = function from(callback) {
  return new Builder(this, callback);
};

Context.prototype.at = function at(pageNum) {
  assert(Number.isInteger(pageNum));
  assert(pageNum > 0);
  return new Fetcher(this, pageNum);
};

Context.prototype.getStorage = function getStorage() {
  return this._storage;
};

module.exports = Context;
