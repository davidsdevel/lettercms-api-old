const createRequest = require('@lettercms/sdk/cjs/lib/utils/createRequest');

class FacebookSDK {
  constructor(token) {
    this.token = token;
    this.endpoint = 'https://graph.facebook.com';
    this.appID = '';
    this.appSecret = '';
  }
  static async exchangeToken(token) {
    try {
      const {
        endpoint,
        appID,
        appSecret
      } = this.constructor;

      const {access_token} = await createRequest(`${endpoint}/oauth/access_token`, {
        grant_type: 'fb_exchange_token',
        client_id: appID,
        client_secret: appSecret,
        fb_exchange_token: token
      });

      return Promise.resolve(access_token);

    } catch(err) {
      return Promise.reject(err);
    }
  }
  _baseRequest(path, method, data) {
    if (!data && typeof method === 'object') {
      data = method;
      method = 'GET';
    }

    return createRequest(`${this.endpoint}${path}`, method, {
      client_id: this.appID,
      client_secret: this.appSecret,
      access_token: this.accessToken,
      ...data
    });
  }
  async getPages(userID) {
    const {data} = await this._baseRequest(`/${userID}/accounts`, {
      fields: ['name','access_token']
    });

    return Promise.resolve(data);
  }
  async publishPost(message) {
    return this._baseRequest(`/${pageID}/feed`, {
      message
    });

  }
}

/*pages_show_list
pages_manage_ads,
pages_manage_metadata,
pages_read_engagement,
pages_read_user_content.

pages_manage_posts,
pages_manage_engagement.
*/