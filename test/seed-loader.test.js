/* global describe it */

const SeedLoader = require('../').SeedLoader;
const seeds = require('./seeds/seeds');

class Schema {
  constructor(data) {
    this.data = data;
  }

  // eslint-disable-next-line
  remove(cb) {
    setTimeout(() => { cb(); }, 0);
  }

  // eslint-disable-next-line
  save(cb) {
    setTimeout(() => { cb(); }, 0);
  }
}

describe('SeedLoader', () => {
  it('should load the loader data', (done) => {
    const sl = new SeedLoader(seeds, Schema);
    sl.load().then(() => done());
  });
  it('should drop the loader data', (done) => {
    done();
  });
});
