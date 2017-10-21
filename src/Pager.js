const Context = require('./Context');

function Pager(storagePath) {
  this._storagePath = storagePath;
}

Pager.prototype.context = function context(key) {
  return new Context(this._storagePath, key);
};

module.exports = Pager;
