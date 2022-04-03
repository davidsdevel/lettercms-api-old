const {Schema} = require('mongoose');

const Facebook = new Schema({
  pageId: {
    type: String,
    unique: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    unique: true
  },
  name: String,
  username: String,
  picture: String,
  cover: String
});

const Instagram = new Schema({
  userId: {
    type: String,
    unique: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    unique: true
  },
  name: String,
  username: String,
  picture: String
});


module.exports = {
  Facebook,
  Instagram
}
