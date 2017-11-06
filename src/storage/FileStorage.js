const fs = require('fs');

function FileStorage(pathname) {
  this._pathname = pathname;
}

FileStorage.prototype.write = function write(page, data) {
  return new Promise((resolve, reject) => {
    let pathname = this._pathname + '-' + page;
    fs.writeFile(pathname, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

FileStorage.prototype.read = function read(page) {
  return new Promise((resolve, reject) => {
    let pathname = this._pathname + '-' + page;
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
