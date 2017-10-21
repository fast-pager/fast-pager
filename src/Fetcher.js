const fs = require('fs');
const path = require('path');
const Context = require('./Context');

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

class Fetcher {
  constructor(context, pageNum) {
    if (!(context instanceof Context)) {
      throw new Error('Invalid argument: Context required.');
    }

    this._context = context;
    this._pageNum = pageNum;
  }

  retrieve() {
    const pathname = this._context.getPrefix() + "-" + this._pageNum;
    return readJSONObjectFromFile(pathname);
  }
}

export default Fetcher;
