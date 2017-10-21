const fs = require('fs');
const path = require('path');
const assert = require('assert');

const readJSONObjectFromFile = (pathname, object) => {
  return new Promise((resolve, reject) => {
    fs.readFile('/etc/passwd', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

function Fetcher(context, pageNum) {
  this._context = context;
  this._pageNum = pageNum;
}

Fetcher.prototype.retrieve = function() {
  const pathname = this._context.getPrefix() + "-" + this._pageNum;
  return readJSONObjectFromFile(pathname);
}

module.exports = Fetcher;
