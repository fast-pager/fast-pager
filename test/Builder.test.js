const Builder = require('../src/Builder');
const Context = require('../src/Context');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const os = require('os');

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

  describe('build()', () => {
    let storageLocation = '';
    beforeEach((done) => {
      fs.mkdtemp(path.join(os.tmpdir(), 'pager-'), (err, pathname) => {
        storageLocation = pathname;
        done();
      });
    })

    afterEach((done) => {
      fs.readdir(storageLocation, (err, files) => {
        let promises = [];
        files.forEach((file) => {
          promises.push(new Promise((resolve) => {
            fs.unlink(path.join(storageLocation, file), resolve);
          }));
        });

        Promise
          .all(promises)
          .then(() => {
            fs.rmdir(storageLocation);
            done();
          });
      });
    });

    test('normal usage', (done) => {
      const key = 'test';
      const context = new Context(storageLocation, key);
      const retriever = (pageNum) => {
        if (pageNum > 1) {
          return Promise.resolve([]);
        }

        return Promise.resolve([{title: 'test'}]);
      }
      const builder = new Builder(context, retriever);
      builder.build()
        .then(() => {
          let location = path.join(storageLocation, key) + '-1';
          fs.access(location, (err) => {
            expect(err).toBeFalsy();
            done();
          });
        });
    });
  });
});
