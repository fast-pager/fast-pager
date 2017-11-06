function FileStorage(pathname) {
  this._pathname = pathname;
}

FileStorage.prototype.write = function write(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(this._pathname, JSON.stringify(object), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

FileStorage.prototype.read = function read() {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

module.exports = FileStorage;
