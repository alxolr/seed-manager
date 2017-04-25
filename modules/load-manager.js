const async = require('async');

function LoaderManager(loaders = []) {
  this.loaders = loaders;

  function add(loader) {
    if (this.loaders.indexOf(loader) !== -1) {
      this.loaders.push(loader);
    }
  }

  function remove(loader) {
    const position = this.loaders.indexOf(loader);
    if (position !== -1) {
      this.loaders.splice(position, 1);
    }
  }

  function load() {
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

  function drop() {
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

  return {
    add,
    remove,
    load,
    drop,
  };
}

module.exports = LoaderManager;
