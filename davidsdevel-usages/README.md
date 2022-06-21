# Usage

La API de uso sera utilizada para gestionar el uso de la aplicacion y el pago de la misma

### Esquema

```js
module.exports = exports = {
  postsVersions: {
    type: Number,
    required: true,
    default: 0
  },
  pages: {
    type: Number,
    required: true,
    default: 0
  },
  abTest: {
    type: Number,
    required: true,
    default: 0
  },
  statsReports: {
    type: Number,
    required: true,
    default: 0
  },
  statsRealtimeEnabled: {
    type: Boolean,
    required: true,
    default: false
  }
  socialSchedule: {
    type: Number,
    required: true,
    default: 0
  },
  socialAccounts: {
    type: Number,
    required: true,
    default: 0
  },
  emailsCampaign:{
    type: Number,
    required: true,
    default: 0
  },
  accountsCollabs: {
    type: Number,
    required: true,
    default: 0
  },
  accountsSingle: {
    type: Number,
    required: true,
    default: 0
  },
  filesStorage: {
    type: Number,
    required: true,
    default: 0
  },
  filesUpload: {
    type: Number,
    required: true,
    default: 0
  }
}

```

### API

Public API


- GET  /api/usage
