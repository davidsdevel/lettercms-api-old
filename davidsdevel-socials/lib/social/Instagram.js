const Base = require('./base');


class IG extends Base {
  async publishPost(caption, image) {

    let containerID = null;
    if (typeof image === 'string') {
      const a = await this._baseRequest(`/${this.ID}/media`, 'POST', {
        caption,
        image_url: image
      });

      console.log(a)
      containerID = a.id;
    } else {
      if (image.length > 10)
        return Promise.reject({
          status: 'social/publish-error',
          message: 'Instagram only can post 10 images'
        });

      const ids = await Promise.all(
        image.map(e =>
          this._baseRequest(`/${this.ID}/media`, 'POST', {
            image_url: e,
            is_carousel_item: true
          })
        )
      );

      const {id} = await this._baseRequest(`/${this.ID}/media`, 'POST', {
        media_type: 'CAROUSEL',
        caption,
        children: ids.map(e => e.id).join('%2C')
      });

      containerID = id;
    }

    return this._baseRequest(`/${this.ID}/media_publish`, 'POST', {
      creation_id: containerID
    });
  }

  async getPosts() {
    return this._baseRequest(`/${this.ID}/media`, {
      fields: 'caption,id,ig_id,media_url,permalink,shortcode,timestamp,username'
    });
  }
}

module.exports = IG;
