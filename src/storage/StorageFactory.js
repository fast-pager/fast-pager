const path = require('path');
const redis = require('redis');
const FileStorage = require('./FileStorage');
const RedisStorage = require('./RedisStorage');

module.exports = function StorageFactory(storage, key) {
  let result = null;
  if (typeof storage === 'string') {
    result = new FileStorage(path.join(storage, key));
  } else if (storage instanceof redis.RedisClient) {
    result = new RedisStorage(storage, key);
  } else {
    throw new Error('Invalid storage input');
  }
  return result;
};
