const {Facebook, Instagram} = require('./social');

module.exports = async function() {
  const {
    req,
    res,
    Model:{
      Facebook,
      Instagram
    }
  } = this;

  const {social} = req.query;
  const {subdomain} = req;

  if (social === 'instagram') {
    /*const {userId, token} = await Instagram.findOne({
      subdomain
    }, 'userId token');

    const ig = new Instagram(userId, token);

    const data = await ig.getPosts();

    return res.json(data);*/
    return res.json({
      data: [{
          caption: 'Hello World',
          id: '1',
          ig_id: '2',
          media_url: 'http://localhost:3000/images/landing-mobile.jpg',
          permalink: '',
          shortcode: '',
          timestamp: '2021-03-31T18:10:00+0000',
          username: 'davidsdevel'
        }]
      });
  }

  if (social === 'facebook') {
    /*const {token, pageId} = await Facebook.findOne({
      subdomain
    }, 'token pageId');

    const fb = new Facebook(pageId, token);

    const data = await fb.getPosts();

    return res.json(data);*/

    return res.json({
      data: [
        {
          "attachments": {
            "data": [
              {
                "description": "\u00bfTe imaginas crear una tienda sin invertir en productos? \u00bfSuena loco, no? Pues, esta esto se ha convertido en un gran modelo de negocio",
                "media": {
                  "image": {
                    "height": 630,
                    "src": "https://external-mia3-2.xx.fbcdn.net/safe_image.php?d=AQG6eGCzPslYNgsr&w=630&h=630&url=https\u00253A\u00252F\u00252F1.bp.blogspot.com\u00252F-G02Cr9jKhvY\u00252FXxTF5cdBG7I\u00252FAAAAAAAAAUE\u00252FN7oI_nbG4NwV7ytWUo0j2efLfKK69tzWgCLcBGAsYHQ\u00252Fw1200-h630-p-k-no-nu\u00252Fwhite-water-boat-753331.jpg&cfs=1&ccb=3-5&_nc_hash=AQFWFGVPi3To9PDn",
                    "width": 630
                  }
                },
                "target": {
                  "url": "https://l.facebook.com/l.php?u=https\u00253A\u00252F\u00252Fwww.davidsdevel.tk\u00252F2020\u00252F07\u00252Fque-es-dropshipping.html&h=AT2_f5RGmdz_Rcp2FFd23tgGBSn65PPBxOjF_U4qK8d5i7VhgXg2IwWUXeuYUIFyyOMXxOH4x-b6CdSqUAjPRbUJt24-GF_oNHL-mO3yUI1WsuVzPy8gD_UeZOpn4JiCZG4i&s=1"
                },
                "title": "Aprende a crear un e-commerce sin productos - \u00bfQu\u00e9 es dropshipping?",
                "type": "share",
                "url": "https://l.facebook.com/l.php?u=https\u00253A\u00252F\u00252Fwww.davidsdevel.tk\u00252F2020\u00252F07\u00252Fque-es-dropshipping.html&h=AT2_f5RGmdz_Rcp2FFd23tgGBSn65PPBxOjF_U4qK8d5i7VhgXg2IwWUXeuYUIFyyOMXxOH4x-b6CdSqUAjPRbUJt24-GF_oNHL-mO3yUI1WsuVzPy8gD_UeZOpn4JiCZG4i&s=1"
              }
            ]
          },
          "message": "\ud83e\udd14\u00bfHas escuchado el termino Dropshipping?\n\nAprende que es y si es lo mejor para tu ecommerce\n\nhttps://www.davidsdevel.tk/2020/07/que-es-dropshipping.html",
          id: "552760701890501_887301781769723",
          created_time: "2020-07-21T03:09:56+0000",
          full_picture: 'https://url'
        }
      ]
    })
  }
   if (social === 'twitter') {
    /*const {token, pageId} = Facebook.findOne({
      subdomain
    }, null, 'token pageId');*/

    /*const fb = {
      subdomain: 'davidsdevel',
      token: 'EAAEytdOWWx0BAJzdRFJsVr8DiMe5aPwEFP0BShHcoxVsLCJVj6xbcjbaSmelESGIZBmzO7fwtus8rfHoLZCQwp5uet7kAsGeXJyZBnN0JkkcLm0ZArShoPZBUWHdZBREEGqpWg1wQtdYY9gJi0ixYLzDLgaLAsI5whexZAbT0RUcQZDZD',
      name: 'David\'s Devel',
      pageId: '552760701890501',
      picture: 'https://graph.facebook.com/552760701890501/picture',
      cover: 'String'
    }

    const pageId = '552760701890501';
    const token = 'EAAEytdOWWx0BAJzdRFJsVr8DiMe5aPwEFP0BShHcoxVsLCJVj6xbcjbaSmelESGIZBmzO7fwtus8rfHoLZCQwp5uet7kAsGeXJyZBnN0JkkcLm0ZArShoPZBUWHdZBREEGqpWg1wQtdYY9gJi0ixYLzDLgaLAsI5whexZAbT0RUcQZDZD';

    const fb = new Facebook(pageId, token);

    const data = await fb.getPosts();

    return res.json(data);*/

    return res.json({
      data: [
        {
          "created_at": "Thu Apr 06 15:28:43 +0000 2017",
          "id": 850007368138018817,
          "id_str": "850007368138018817",
          "text": "RT @TwitterDev: 1/ Today we’re sharing our vision for the future of the Twitter API platform!nhttps://t.co/XweGngmxlP",
          "truncated": false,
          "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [
              {
                "screen_name": "TwitterDev",
                "name": "TwitterDev",
                "id": 2244994945,
                "id_str": "2244994945",
                "indices": [
                  3,
                  14
                ]
              }
            ],
            "urls": [
              {
                "url": "https://t.co/XweGngmxlP",
                "expanded_url": "https://cards.twitter.com/cards/18ce53wgo4h/3xo1c",
                "display_url": "cards.twitter.com/cards/18ce53wg…",
                "indices": [
                  94,
                  117
                ]
              }
            ]
          },
          "user": {
            "id": 6253282,
            "id_str": "6253282",
            "name": "Twitter API",
            "screen_name": "twitterapi",
            "location": "San Francisco, CA",
            "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
            "url": "http://t.co/78pYTvWfJd",
            "entities": {
              "url": {
                "urls": [
                  {
                    "url": "http://t.co/78pYTvWfJd",
                    "expanded_url": "https://dev.twitter.com",
                    "display_url": "dev.twitter.com",
                    "indices": [
                      0,
                      22
                    ]
                  }
                ]
              },
              "description": {
                "urls": []
              }
            },
            "protected": false,
            "followers_count": 6172353,
            "friends_count": 46,
            "listed_count": 13091,
            "created_at": "Wed May 23 06:01:13 +0000 2007",
            "favourites_count": 26,
            "utc_offset": -25200,
            "time_zone": "Pacific Time (US & Canada)",
            "geo_enabled": true,
            "verified": true,
            "statuses_count": 3583,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "C0DEED",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/656927849/miyt9dpjz77sc0w3d4vj.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/656927849/miyt9dpjz77sc0w3d4vj.png",
            "profile_background_tile": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/6253282/1431474710",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false,
            "translator_type": "regular"
          },
          "geo": null,
          "coordinates": null,
          "place": null,
          "contributors": null,
          "retweeted_status": {
            "created_at": "Thu Apr 06 15:24:15 +0000 2017",
            "id": 850006245121695744,
            "id_str": "850006245121695744",
            "text": "1/ Today we’re sharing our vision for the future of the Twitter API platform!nhttps://t.co/XweGngmxlP",
            "truncated": false,
            "entities": {
              "hashtags": [],
              "symbols": [],
              "user_mentions": [],
              "urls": [
                {
                  "url": "https://t.co/XweGngmxlP",
                  "expanded_url": "https://cards.twitter.com/cards/18ce53wgo4h/3xo1c",
                  "display_url": "cards.twitter.com/cards/18ce53wg…",
                  "indices": [
                    78,
                    101
                  ]
                }
              ]
            },
            "source": '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
              "id": 2244994945,
              "id_str": "2244994945",
              "name": "TwitterDev",
              "screen_name": "TwitterDev",
              "location": "Internet",
              "description": "Your official source for Twitter Platform news, updates & events. Need technical help? Visit https://t.co/mGHnxZCxkt ⌨️  #TapIntoTwitter",
              "url": "https://t.co/66w26cua1O",
              "entities": {
                "url": {
                  "urls": [
                    {
                      "url": "https://t.co/66w26cua1O",
                      "expanded_url": "https://dev.twitter.com/",
                      "display_url": "dev.twitter.com",
                      "indices": [
                        0,
                        23
                      ]
                    }
                  ]
                },
                "description": {
                  "urls": [
                    {
                      "url": "https://t.co/mGHnxZCxkt",
                      "expanded_url": "https://twittercommunity.com/",
                      "display_url": "twittercommunity.com",
                      "indices": [
                        93,
                        116
                      ]
                    }
                  ]
                }
              },
              "protected": false,
              "followers_count": 465425,
              "friends_count": 1523,
              "listed_count": 1168,
              "created_at": "Sat Dec 14 04:35:55 +0000 2013",
              "favourites_count": 2098,
              "utc_offset": -25200,
              "time_zone": "Pacific Time (US & Canada)",
              "geo_enabled": true,
              "verified": true,
              "statuses_count": 3031,
              "lang": "en",
              "contributors_enabled": false,
              "is_translator": false,
              "is_translation_enabled": false,
              "profile_background_color": "FFFFFF",
              "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
              "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
              "profile_background_tile": false,
              "profile_image_url": "http://pbs.twimg.com/profile_images/530814764687949824/npQQVkq8_normal.png",
              "profile_image_url_https": "https://pbs.twimg.com/profile_images/530814764687949824/npQQVkq8_normal.png",
              "profile_banner_url": "https://pbs.twimg.com/profile_banners/2244994945/1396995246",
              "profile_link_color": "0084B4",
              "profile_sidebar_border_color": "FFFFFF",
              "profile_sidebar_fill_color": "DDEEF6",
              "profile_text_color": "333333",
              "profile_use_background_image": false,
              "has_extended_profile": false,
              "default_profile": false,
              "default_profile_image": false,
              "following": true,
              "follow_request_sent": false,
              "notifications": false,
              "translator_type": "regular"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 284,
            "favorite_count": 399,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "lang": "en"
          },
          "is_quote_status": false,
          "retweet_count": 284,
          "favorite_count": 0,
          "favorited": false,
          "retweeted": false,
          "possibly_sensitive": false,
          "lang": "en"
        }
      ]
    })
  }
}