const assert = require('assert');

function Fetcher(context, pageNum) {
  assert(context);
  assert(pageNum);
  this._context = context;
  this._pageNum = pageNum;
}

Fetcher.prototype.retrieve = function retrieve() {
  return this._context.getStorage().read(this._pageNum);
};

module.exports = Fetcher;
