const {Schema} = require('mongoose');

const Views = new Schema({
  subdomain:{
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  referer: String,
  os: String,
  browser: String,
  country: String,
  time:{
    type: Date,
    default: Date.now,
    required: true
  }
});

const Stats = new Schema({
  totalViews: {
    type: Number,
    default: 0
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  bounces:{
    default: 0,
    type: Number,
  },
  bounceRate: {
    default: 0,
    type: Number,
  },
  //comments: [Comments] //We look if we can use Facebook Comments
  subscriptors: {
    type: Number,
    default: 0
  }
});

const Sessions = new Schema({
  subdomain: {
    type: String,
    required: true,
  },
  routes: {
    type: Array,
    required: true
  },
  sessionTime: {
    type: Number,
    required: true
  }
})

module.exports = {
  Stats,
  Views,
  Sessions
}