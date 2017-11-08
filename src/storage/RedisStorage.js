function RedisStorage(redisClient, key) {
  this._client = redisClient;
  this._key = key;
}

RedisStorage.prototype.write = function write(page, data) {
  return new Promise((resolve, reject) => {
    let handler = (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    };
    this._client.set(this._key + '-' + page, JSON.stringify(data), handler);
  });
};

RedisStorage.prototype.read = function read(page) {
  return new Promise((resolve, reject) => {
    this._client.get(this._key + '-' + page, (err, reply) => {
      if (err) {
        reject(err);
        return;
      }
      if (reply === null) {
        resolve(null);
        return;
      }
      resolve(JSON.parse(reply));
    });
  });
};

module.exports = RedisStorage;
