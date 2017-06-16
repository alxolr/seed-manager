/* global describe it */

const LoadManager = require('../').LoadManager;

const loader = () => {
  const drop = () => new Promise((resolve) => {
    setTimeout(() => resolve(), 0);
  });
  const load = () => new Promise((resolve) => {
    setTimeout(() => resolve(), 0);
  });

  return {
    drop,
    load,
  };
};

describe('LoadManager', () => {
  it('should load the loader data', (done) => {
    const lm = new LoadManager();
    lm.add(loader);

    lm.load()
      .then(() => done());
  });
  it('should drop the loader data', (done) => {
    const lm = new LoadManager();
    lm.add(loader);

    lm.drop()
      .then(() => done());
  });
});
