const Model = require('./lib/database');
const sdk = require('../SDK');

(async function() {

  const condition = {tags:["hola"],title:"Hola Mundo",url:"hola-mundo",content:"<p>Nueva super entrada</p>",action:"publish", subdomain:'davidsdevel',_id:'61da21e254f01a0f2cbe857a'}
      
  const {
    _id,
    url,
    subdomain
  } = condition;

  let existsPost = false;

  if (data.url) {
    const existsPost = await this.exists({
      url: data.url,
      subdomain,
      postStatus: 'published'
    });

    if (existsPost)
      return console.log('Exists Posts');

    const existsPage = await sdk.Letter.existsPage({
      subdomain,
      url: data.url,
      pageStatus: 'published'
    });

    if (existsPage)
      return console.log('Exists Page');
  }

  const date = new Date();

  const newData = {
    ...data,
    updated: date,
    postStatus: 'published'
  } 

    const found = await this.findOne(condition, 'published');

    if (found !== null) {
      if (!('published' in found))
        newData.published = date;
    }
    console.log(condition,newData)

    const res = await this.updateOne(condition, newData);

    console.log(res)

    return Promise.resolve({
      exists: false
    });
})()