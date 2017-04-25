const SeedLoader = require('./modules/seed-loader');
const LoadManager = require('./modules/load-manager');

SeedLoader(['one', 'two', 'tree'], Number);

module.exports = {
  SeedLoader,
  LoadManager,
};
