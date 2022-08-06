const mongoose = global.mongo || require('mongoose');
const models = require('@lettercms/models');

const aliases = {
  accounts: {
    name: 'BlogAccount',
    path: '@lettercms/models/' 
  },
  invitations: {
    name: 'BlogInvitations',
    path: '@lettercms/models/' 
  },
  blogs: {
    name: 'Blogs',
    path: '@lettercms/models/' 
  },
  images: {
    name: 'BlogImages',
    path: '@lettercms/models/' 
  },
  pages: {
    name: 'BlogPages',
    path: '@lettercms/models/' 
  },
  posts: {
    name: 'BlogPosts',
    path: '@lettercms/models/' 
  },
  facebook: {
    name: 'FacebookAccounts',
    path: '@lettercms/models/' 
  },
  instagram: {
    name: 'InstagramAccounts',
    path: '@lettercms/models/' 
  },
  stats: {
    name: 'BlogStats',
    path: '@lettercms/models/' 
  },
  views: {
    name: 'BlogViews',
    path: '@lettercms/models/' 
  },
  sessions: {
    name: 'BlogSessions',
    path: '@lettercms/models/' 
  },
  users: {
    name: 'BlogUsers',
    path: '@lettercms/models/' 
  },
}

const operation = (model, operation) => async (...args) => {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  
  let mongoModel = null;

  const models = require('@lettercms/models')([model]);
  console.log(models)

  if (model === 'accounts')
    mongoModel = models.accounts.Accounts;
  else if (model === 'invitations')
    mongoModel = models.accounts.Invitations;
  else if (model === 'views')
    mongoModel = models.stats.Views;
  else if (model === 'sessions')
    mongoModel = models.stats.Sessions;
  else if (model === 'stats')
    mongoModel = models.stats.Stats;
  else if (model === 'facebook')
    mongoModel = models.socials.Facebook;
  else if (model === 'instagram')
    mongoModel = models.socials.Instagram;
  else if (model === 'payment')
    mongoModel = models.payment.Payment;
  else if (model === 'invoices')
    mongoModel = models.payment.Invoices;
  else if (model === 'users')
    mongoModel = models.users.Users;
  else if (model === 'ratings')
    mongoModel = models.users.Ratings;
  else
    mongoModel = models[model];

  const res = await mongoModel[operation].apply(mongoModel, args);
  await mongoose.disconnect();

  global.mongo = mongoose;

  return Promise.resolve(res);
}


module.exports = exports = {
  operation
};
