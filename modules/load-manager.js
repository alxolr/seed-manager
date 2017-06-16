const async = require('async');

class LoaderManager {
  constructor(loaders = []) {
    this.loaders = loaders;
  }

  add(loader) {
    if (this.loaders.indexOf(loader) !== -1) {
      this.loaders.push(loader);
    }
  }

  remove(loader) {
    const position = this.loaders.indexOf(loader);
    if (position !== -1) {
      this.loaders.splice(position, 1);
    }
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
