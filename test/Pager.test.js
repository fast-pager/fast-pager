const Pager = require('../src/Pager');
const Context = require('../src/Context');

describe('Pager', () => {
  describe('constructor', () => {
    test('initialized normally', () => {
      const pager = new Pager('test');
      expect(pager).toBeTruthy();
    });
  });

  describe('context()', () => {
    test('normal usage', () => {
      const pager = new Pager('test');
      expect(pager.context('test')).toBeInstanceOf(Context);
    });
  });
});
