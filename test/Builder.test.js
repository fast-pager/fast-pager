const Builder = require('../src/Builder');
const Context = require('../src/Context');

describe('Builder', () => {
  describe('constructor', () => {
    test('initialized normally', () => {
      const context = new Context('test', 'test');
      const builder = new Builder(context, () => { return Promise.resolve(); });
      expect(builder).toBeTruthy();
      expect(builder._context).toBe(context);
      expect(builder._retriever).toBeTruthy();
    });

    test('invalid context', () => {
      expect(() => {
        const builder = new Builder(null, () => { return Promise.resolve(); });
      }).toThrow();
    });

    test('invalid retriever', () => {
      expect(() => {
        const context = new Context('test', 'test');
        const builder = new Builder(context);
      }).toThrow();
    });
  });
});
