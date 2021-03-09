const Schema = require('./schema');

const {model} = require('mongoose');

const UsersModel = model('BlogUser', Schema);

module.exports = UsersModel;
