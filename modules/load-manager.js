const async = require('async');

class LoaderManager {
  constructor(loaders) {
    this.loaders = loaders || [];
  }

  use(loader) {
    this.loaders.push(loader);
  }

  load() {
    return new Promise((resolve, reject) => {
      async.each(this.loaders, (loader, cb) => {
        loader.drop()
          .then(loader.load())
          .then(() => cb());
      }, (err, data) => {
        if (err) reject(err);

        resolve(data);
      });
    });
  }

  drop() {
    return new Promise((resolve, reject) => {
      async.each(this.loaders, (loader, cb) => {
        loader.drop()
          .then(() => cb());
      }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = LoaderManager;
