const Base = require('./base');


class IG extends Base {
  async publishPost(caption, image) {
    const {id} = await this._baseRequest(`/${this.ID}/media`, 'POST', {
      caption,
      image_url: image
    });

    return this._baseRequest(`/${this.ID}/media_publish`, 'POST', {
      creation_id: id
    });
  }

  async getPosts() {
    return this._baseRequest(`/${this.ID}/media`, {
      fields: 'caption,id,ig_id,media_url,permalink,shortcode,timestamp,username'
    });
  }
}

module.exports = IG;
