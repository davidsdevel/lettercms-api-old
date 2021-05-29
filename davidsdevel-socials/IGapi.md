IGUser 17841405843756074

IGAccessToken EAAEytdOWWx0BALqsuAeIqjn8boSQXVnU1tWbYKR49nd9ZBtN8JjpayqmKykiZCcJBXZBbOiVp5HULbjOQYrA6dfFiUvOygJllqB1JsJxBjNXnsdieYgbZB4j8megS8qKqMI8AG1kNegBd1NBgPPBunpZB9TjFxE7MRbG549c9xgZDZD


Leer

GET /{ig-user-id}?fields={fields}

Obtén campos y perímetros en una cuenta de Instagram para creadores o de Instagram para empresas.
Parámetros de cadena de la consulta

    {fields}: una lista separada por comas de los campos que deseas que se devuelvan. Consulta Campos disponibles.

Permisos

Un token de acceso de usuario de Facebook con los siguientes permisos:

    pages_read_engagement
    instagram_basic y cualquiera de los permisos ads_management, business_management, pages_show_list

Campos disponibles

- biography*
- id*
- ig_id
- followers_count*
- follows_count
- media_count*
- name
- profile_picture_url
- username*
- website*


# Instagram API

## Get Feed

GET /{ig-user-id}/media?access_token={access-token}

Response:
```json
  {
    "data": [
      {
        "id": "ig-media-id"
      }
    ]
  }
```

Then map the Array

GET /{ig-media-id}?fields={fields}

Fields: 
- caption
- comments_count
- id
- ig_id
- is_comment_enabled
- like_count
- media_product_type
- media_type
- media_url
- owner
- permalink
- shortcode
- thumbnail_url
- timestamp
- username
- video_title

Response:
```json
  {
    "id": "17895695668004550",
    "media_type": "IMAGE",
    "media_url": "https://fb-s-b-a.akamaihd.net/h-ak-fbx/t51.2885-9/21227247_1640962412602631_3222510491855224832_n.jpg?_nc_log=1",
    "owner": {
      "id": "17841405822304914"
    },
    "timestamp": "2017-08-31T18:10:00+0000"
  }
```

## Publish Photo

Create a Media

POST /{ig-user-id}/media

Queries:
- image_url (required)
- caption
- location_id
- user_tags

Response:
```json
{
  "id": "ig-media-id"
}
```
Then Publish that Media

POST /{ig-user-id}/media_publish

Queries:
- creation_id: {ig-media-id}
