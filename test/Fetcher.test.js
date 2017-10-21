const Fetcher = require('../src/Fetcher');
const Context = require('../src/Context');

describe('Fetcher', () => {
  describe('constructor', () => {
    test('initialized normally', () => {
      const context = new Context('test', 'test');
      const fetcher = new Fetcher(context, 1);
      expect(fetcher).toBeTruthy();
    });
  });

  describe('retrieve()', () => {
    test('normal usage', () => {
      const context = new Context('test', 'test');
      const fetcher = new Fetcher(context, 1);
      return fetcher.retrieve()
        .then((data) => {
          expect(data).not.toBe(null);
          expect(data.length).toBe(1);
          expect(data[0].title).toBe('test');
          return Promise.resolve();
        })
    });
  });
});
