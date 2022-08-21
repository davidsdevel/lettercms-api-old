const {usage, social} = require('@lettercms/models')(['usage', 'instagram']);
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

  const {token, userId} = social.Instagram.findOne({subdomain}, 'token userId');

  const {data} = await api(`/${userId}/content_publishing_limit`, {
    access_token: token,
    fields: 'quota_usage'
  });

  const isUsed = data[0].quota_usage;

  const limits = {
    posts: {
      versioning: {
        used: postsVersions,
        label: 'Control de versiones de entradas',
        price: '0.01',
        available: constants.posts.versioning.limit - postsVersions
      }
    },
    files: {
      storage: {
        used: filesStorage,
        label: 'Almacenamiento',
        units: 'GB',
        price: '0.6',
        available: (constants.files.storage.limit - filesStorage)
      },
      upload: {
        used: filesUpload,
        label: 'Cargas',
        price: '0.05',
        available: constants.files.upload.limit - filesUpload
      }
    },
    pages: {
      used: pages,
      label: 'Paginas',
      price: '0.1',
      available: constants.pages.published.limit - pages
    },
    social: {
      schedule: {
        used: socialSchedule,
        label: 'Programacion de publicaciones',
        available: constants.social.schedule.limit - socialSchedule,
        price: '0.05'
      },
      instagramPosts: {
        used: isUsed,
        available: 25 - isUsed,
      },
      accounts: {
        used: socialAccounts,
        label: 'Redes Sociales Adicionales',
        price: '0.01'
      }
    },
    accounts: {
      collaborators: {
        used: accountsCollabs,
        label: 'Colaboradores',
        price: '1'
      },
      single: {
        used: accountsSingle,
        label: 'Cuentas Unicas',
        price: '0.1'
      }
    },
    ab: {
      tests: {
        used: abTest,
        label: 'Pruebas A/B Adicionales',
        available: constants.ab.test.limit - abTest,
        price: '0.005'
      }
    },
    stats: {
      realtimeEnabled: statsRealtimeEnabled,
      reports: {
        used: statsReports,
        label: 'Reportes de Analiticas',
        price: '0.01'
      }
    },
    emails: {
      campaigns: emailsCampaign
    },
  };

  res.json(limits);
}
