const Builder = require('../src/Builder');
const Fetcher = require('../src/Fetcher');
const Context = require('../src/Context');

describe('Context', () => {
  describe('constructor', () => {
    test('initialized normally', () => {
      const context = new Context('test', 'key');
      expect(context).toBeTruthy();
      expect(context._storage).not.toBe(null);
      expect(context._key).toBe('key');
    });
  });

  describe('from()', () => {
    test('normal usage', () => {
      const context = new Context('test', 'key');
      const result = context.from(() => { return Promise.resolve(); });

      expect(result).toBeInstanceOf(Builder);
    });
  });

  describe('at()', () => {
    test('normal usage', () => {
      const context = new Context('test', 'key');
      const result = context.at(5);

      expect(result).toBeInstanceOf(Fetcher);
    });
  });
});
