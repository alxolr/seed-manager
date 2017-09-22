const async = require('async');

class SeedLoader {
  constructor(seeds = [], schema = {}) {
    this.seeds = seeds;
    this.schema = schema;
  }

  load() {
    return new Promise((resolve, reject) => {
      async.eachSeries(this.seeds, (seed, cb) => {
        // eslint-disable-next-line
        const model = new this.schema(seed);
        model.save().then((model) => {
          cb(null, model);
        })
      }, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  drop() {
    return this.schema.remove({});
  }
}

module.exports = SeedLoader;
