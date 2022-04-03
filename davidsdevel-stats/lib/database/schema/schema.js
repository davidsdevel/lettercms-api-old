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
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  totalViews: {
    type: Number,
    default: 0
  },
  bounces:{
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
  },
  socialReferral: {
    type: String
  },
  device: {
    type: String,
    required: true,
    enum: ['mobile', 'desktop']
  },
  entryChannel: {
    type: String,
    required: true,
    enum: [
      'organic',
      'direct',
      'referral',
      'emai',
      'social',
      'other'
    ]
  }
})

module.exports = {
  Stats,
  Views,
  Sessions
}