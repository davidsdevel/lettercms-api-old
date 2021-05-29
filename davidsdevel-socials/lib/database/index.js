const {Facebook, Instagram} = require('./schema');
const {model} = require('mongoose');

const FacebookModel = model('FacebookAccount', Facebook);
const InstagramModel = model('InstagramAccount', Instagram);

module.exports = {
  Facebook: FacebookModel,
  Instagram: InstagramModel,
};
