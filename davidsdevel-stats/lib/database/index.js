const {
  Stats,
  Views,
  Sessions
} = require('./schema');

const {model} = require('mongoose');

const StatsModel = model('BlogStats', Stats);
const ViewsModel = model('BlogViews', Views);
const SessionsModel = model('BlogSessions', Sessions);

module.exports = {
  Stats: StatsModel,
  Views: ViewsModel,
  Sessions: SessionsModel
};
