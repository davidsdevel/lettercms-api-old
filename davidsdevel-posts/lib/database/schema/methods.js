const Schema = require('./schema');
const sdk = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');

const convert = require('xml-js');

/*
const Notification = require('../SendNotification');
const mailer = new Mail();
*/

/**
 * Search Post
 *
 * @description Returns an Object with all matched posts in DB
 * @public
 *
 * @param {String} query
 * @param {Boolean} pagination
 * @param {String|Number} page
 * @param {String} subdomain
 *
 * @return {Promise<Object>}
 */
Schema.statics.searchPost = async function (query, pagination, page, subdomain) {
  try {
    const postsRes = await this.find({
      content: new RegExp(query, 'i'),
      subdomain
    });

    const posts = postsRes.filter((e) => {
      let foundInTitle = false;
      let foundInTags = false;
      let foundInContent = false;
      let foundInCategory = false;

      if (e.category) {
        foundInCategory = e.category.match(new RegExp(query, 'i')) !== null;
      }
      if (e.tags) {
        foundInTags = e.tags.match(new RegExp(query, 'i')) !== null;
      }
      if (e.title) {
        foundInTitle = e.title.match(new RegExp(query, 'i')) !== null;
      }
      let data;
      if (e.content) {
        data = e.content.split('<').map((ev) => ev.replace(/.*>/, '')).join(' ');

        foundInContent = data.match(new RegExp(query, 'i')) !== null;
      }

      if (foundInContent || foundInTitle || foundInTags || foundInCategory)
        return true;

      return false;
    });

    return posts.length === 0
      ? Promise.resolve('dont-exists')
      : Promise.resolve(/*filterPosts(posts, pagination, page)*/);

  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Set View
 *
 * @description Set a view on a single post
 * @public
 *
 * @param {String} url
 * @param {String} subdomain
 *
 * @return {Promise}
 */
Schema.statics.setView = async function(url, subdomain) {
  try {
    await this.updateOne({ url, subdomain }, {views: {$increment: 1}});

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Set Comment
 *
 * @description Set a comment on a single post
 * @public
 *
 * @param {String} url
 * @param {String} subdomain
 *
 * @return {Promise}
 */
Schema.statics.setComment = async function(url, subdomain) {
  try {
    await this.updateOne({ url }, {comments: {$increment: 1}});

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

Schema.statics.createPost = async function(subdomain, data) {
  try {
    const post = await this.create({
      ...data,
      subdomain,
      postStatus: 'draft',
      created: Date.now()
    });

    return Promise.resolve(post);
  } catch(err) {
    return Promise.reject(err);
  }
}
/**
 * Publish Post
 *
 * @description Publish a Posts into DB
 * @public
 *
 * @param {String} subdomain
 * @param {Object} data
 *
 * @return {Promise<Number>}
 *
 */
Schema.statics.publishPost = async function(condition, data) {
  try {
    const {
      _id,
      url,
      subdomain
    } = condition;

    let existsPost = false;

    if (data.url) {
      const existsPost = await this.exists({
        url: data.url,
        subdomain
      });

      if (existsPost)
        return Promise.resolve({
          exists: true
        });

      const existsPage = await sdk.Letter.existsPage({
        subdomain,
        url: data.url
      });

      if (existsPage)
        return Promise.resolve({
          exists: true
        });
    }

    const date = Date.now();

    const newData = {
      ...data,
      updated: date,
      postStatus: 'published'
    } 

    const found = await this.findOne({url, subdomain}, 'published');

    if (found !== null) {
      if (!('published' in found))
        newData.published = date;
    }

    await this.updateOne({url, subdomain}, newData);

    return Promise.resolve({
      exists: false
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
Schema.statics.draftPost = async function(condition, data) {
  try {
    await this.updateOne(condition, {
      postStatus: 'draft'
    });

    return Promise.resolve({});
  } catch(err) {
    return Promise.reject(err);
  }
}
/**
 * Update Post
 *
 * @description Save a Posts into DB
 * @public
 *
 * @param {Object} data
 *
 * @return {Promise<Number>}
 *
 */
Schema.statics.updatePost = async function(condition, data) {
  try {
    const {
      _id,
      url,
      subdomain
    } = condition;

    let existsPost = false;

    if (data.url) {
      const existsPost = await this.exists({
        url: data.url,
        subdomain
      });

      if (existsPost)
        return Promise.resolve({
          exists: true
        });

      const existsPage = await sdk.Letter.existsPage({
        subdomain,
        url: data.url
      });

      if (existsPage)
        return Promise.resolve({
          exists: true
        });
    }

    await this.updateOne(condition, {
      ...data,
      updated: Date.now()
    });

    return Promise.resolve({});
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Delete Post
 *
 * @description Delete a post from DB
 * @public
 *
 * @param {String} ID
 * @param {String} url
 * @param {String} subdomain
 *
 * @return {Promise<Object>}
 */
Schema.statics.deletePost = async function (data) {
  try {

    await this.deleteOne(data);

    //TODO: make Fetch
    //await this.db('views').where({ url }).delete();

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

  
/**
 * Import Posts From Blogger
 *
 * @public
 *
 * @param {Array<object>} data
 *
 * @return {Promise}
 */
 
Schema.statics.importBlogger = function(subdomain, data) {
  try {
    const dataMapped = data.map(e => {

      /*const exists = 

      if (exists)
        return false;*/

      return {
        ...e,
        subdomain,
        postStatus: 'imported',
      };
    }).filter(async e => !(await this.exists({
      subdomain,
      $or: [
        {created: e.created},
        {title: e.title},
        {url: e.url}
      ]
    })));

    return this.insertMany(dataMapped);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = Schema;
