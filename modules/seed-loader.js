const async = require('async');

function SeedLoader(seeds = [], schema = {}) {
  this.seeds = seeds;
  this.schema = schema;

  function load() {
    return new Promise((resolve, reject) => {
      async.each(this.seeds, (seed, cb) => {
        // eslint-disable-next-line
        const model = new this.schema(seed);
        model.save((err) => {
          if (err) cb(err);
          cb();
        });
      }, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  function drop() {
    return this.schema.remove({});
  }

  return {
    load,
    drop,
  };
}

module.exports = SeedLoader;
