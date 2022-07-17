const Base = require('./base');

class FacebookSDK extends Base {
  /******* Posts *******/
  async publishPost(message, options) {
    const {published = true, schedule, link, images} = options;

    const imagesPaths = {};

    if (images) {
      if (images.length === 1 && !message) {
        return this.publishPhoto(images[0]);
      }

      const postImages = await Promise.all(images.map(url => this.publishPhoto(url, !!schedule)));

      postImages.forEach(({id}, i) => {
        imagesPaths[`attached_media[${i}]`] = {media_fbid: id};
      });
    }

    const fetchOptions = {
      message,
      ...imagesPaths
    };

    if (link)
      fetchOptions.link = link;

    if (schedule) {
      fetchOptions.scheduled_publish_time = schedule;

      if (images)
        fetchOptions.unpublished_content_type = 'SCHEDULED';
    }

    if ((images && schedule) || schedule)
      fetchOptions.published = 'false';
    else
      fetchOptions.published = published.toString();

    return this._baseRequest(`/${this.ID}/feed`, 'POST', fetchOptions);
  }
  async getPosts(opts) {
    return this._baseRequest(`/${this.ID}/scheduled_posts`, {
      ...opts
    });
  }

  /********* Photos **********/
  async publishPhoto(url, isSchedule = false) {
    return this._baseRequest(`/${this.ID}/photos`, 'POST', {
      url,
      temporary: isSchedule ? 'true' : 'false',
      published: !isSchedule ? 'true' : 'false'
    });
  }
}

module.exports = FacebookSDK;

/*pages_show_list
pages_manage_ads,
pages_manage_metadata,
pages_read_engagement,
pages_read_user_content.

pages_manage_posts,
pages_manage_engagement.
*/