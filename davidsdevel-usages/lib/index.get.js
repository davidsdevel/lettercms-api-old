const {usage, social} = require('@lettercms/models');
const constants = require('./constants');
const {api} = require('../../davidsdevel-socials/lib/social/base');


module.exports = async function() {
  const {
    req: {
      subdomain
    },
    res
  } = this;

  const {
    postsVersions,
    pages,
    abTest,
    statsReports,
    statsRealtimeEnabled,
    socialSchedule,
    socialAccounts,
    emailsCampaign,
    accountsCollabs,
    accountsSingle,
    filesStorage,
    filesUpload
  } = await usage.findOne({subdomain});

  /*const {token, userId} = social.Instagram.findOne({subdomain}, 'token userId');

  const {data} = await api(`/${userId}/content_publishing_limit`, {
    access_token: token,
    fields: 'quota_usage'
  });

  const isUsed = data[0].quota_usage*/

  const isUsed = 10;

  const limits = {
    posts: {
      versioning: {
        used: postsVersions,
        available: constants.posts.versioning.limit - postsVersions
      }
    },
    files: {
      storage: {
        used: filesStorage * 1024,
        available: (constants.files.storage.limit - filesStorage) * 1024
      },
      upload: {
        used: filesUpload,
        available: constants.files.upload.limit - filesUpload
      }
    },
    pages: {
      used: pages,
      available: constants.pages.published.limit - pages
    },
    social: {
      schedule: {
        used: socialSchedule,
        available: constants.social.schedule.limit - socialSchedule,
      },
      instagramPosts: {
        used: isUsed,
        available: 25 - isUsed,
      },
      accounts: socialAccounts
    },
    accounts: {
      collaborators: accountsCollabs,
      single: accountsSingle
    },
    ab: {
      tests: {
        used: abTest,
        available: constants.ab.test.limit - abTest
      }
    },
    stats: {
      realtimeEnabled: statsRealtimeEnabled,
      reports: statsReports
    },
    emails: {
      campaigns: emailsCampaign
    },
  };

  res.json(limits);
}
