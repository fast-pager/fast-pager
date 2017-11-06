const path = require('path');
const redis = require('redis');
const assert = require('assert');
const Builder = require('./Builder');
const Fetcher = require('./Fetcher');
const FileStorage = require('./storage/FileStorage');

function Context(storage, key) {
  if (typeof storage === 'string') {
    this._storage = new FileStorage(path.join(storage, key));
  } else if (storage instanceof redis.RedisClient) {
    this._storage = new RedisStorage(storage, key);
  }
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
