const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SeedSchema = new Schema({});

module.exports = mongoose.model('Seed', SeedSchema);
