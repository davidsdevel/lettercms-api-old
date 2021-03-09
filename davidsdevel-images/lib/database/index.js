const {model} = require('mongoose');
const Schema = require('./schema');

const Model = model('BlogImages', Schema);

module.exports = Model;
