const fs = require('fs');
const path = require('path');
const Context = require('./Context');

const saveJSONObjectToFile = (pathname, object) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathname, JSON.stringify(object), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

class Builder {
  constructor(context, retriever) {
    if (!(context instanceof Context)) {
      throw new Error('Invalid argument: Context required.');
    }

    this._context = context;
    this._retriever = retriever;
  }

  build() {
    const storeToFile = (pageNum, result) => {
      if (pageNum < 0) {
        throw new Error('Page number must be positive and non-zero.');
      }

      const pathname = this._context.getPrefix() + "-" + pageNum;
      return saveJSONObjectToFile(pathname, result);
    };

    const storeMeta = (totalPages) => {
      const pathname = this._context.getPrefix() + "-meta";
      const payload = {
        pages: totalPages,
        updated: Date.now()
      };

      return saveJSONObjectToFile(pathname, payload);
    };

    const retrieveAndStore = (pageNum) => {
      return this._retriever(pageNum)
        .then((result) => {
          if (result.length == 0) {
            // no more results here
            return storeMeta(pageNum - 1);
          }
          return Promise.all([
            retrieveAndStore(pageNum + 1),
            storeToFile(pageNum, result)
          ]);
        });
    };

    return retrieveAndStore(1);
  }
}

module.exports = Builder;
