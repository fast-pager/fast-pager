const fs = require('fs');
const assert = require('assert');

const readJSONObjectFromFile = (pathname) => {
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

function Fetcher(context, pageNum) {
  assert(context);
  assert(pageNum);
  this._context = context;
  this._pageNum = pageNum;
}

Fetcher.prototype.retrieve = function retrieve() {
  const pathname = this._context.getPrefix() + '-' + this._pageNum;
  return readJSONObjectFromFile(pathname);
};

module.exports = Fetcher;
