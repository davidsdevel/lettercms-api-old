# Facebook API

## Get Page Photos

GET /{page-id}/photos?type=uploaded

Queries:
- biz_tag_id int64
- business_id numeric string or integer
- type enum{profile, tagged, uploaded} default: profile

Response:
```json
{
  "data": [],
  "paging": {}
}
```

-d "url=https://www.facebook.com/images/fb_icon_325x325.png" \
 -d "published=true" \
 -d "access_token=<access_token>" \
 "https://graph.facebook.com/me/photos"

Temporary

curl -i -X POST \
 -d "url=https://www.facebook.com/images/fb_icon_325x325.png" \
 -d "published=false" \
 -d "temporary=true" \
 -d "access_token=<access_token>" \
 "https://graph.facebook.com/me/photos"


MultiPhoto
curl -i -X POST \
 -d "message=Testing multi-photo post!" \
 -d "attached_media[0]={"media_fbid":"1002088839996"}" \
 -d "attached_media[1]={"media_fbid":"1002088840149"}" \
 -d "access_token=<access_token>" \
 "https://graph.facebook.com/me/feed"

curl -i -X POST \
 -d "message=Testing multi-photo post!" \
 -d "attached_media[0]={"media_fbid":"1002088839996"}" \
 -d "attached_media[1]={"media_fbid":"1002088840149"}" \
 -d "access_token=<access_token>" \
 -d "published=false" \
 -d "scheduled_publish_time=1512068400" \
 -d "unpublished_content_type=SCHEDULED" \
 "https://graph.facebook.com/me/feed"

Campos
Campo Descripción
id
numeric string
  

The ID representing a Facebook Page.

about
string
  
access_token
string

ad_campaign
AdSet

affiliation
string

app_id
id

artists_we_like
string

attire
string

awards
string

band_interests
string

band_members
string

best_page
Page

bio
string

birthday
string

booking_agent
string

built
string
  

Year vehicle was built. Applicable to Vehicles. Can be read with Page Public Content Access or Page Public Metadata Access.

business
  

The Business associated with this Page. Requires business_management permissions, and a page or user access token. The person requesting the access token must be an admin of the page.

can_checkin
bool
  

Whether the Page has checkin functionality enabled. Can be read with Page Public Content Access or Page Public Metadata Access.

can_post
bool
  

Indicates whether the current app user can post on this Page. Can be read with Page Public Content Access or Page Public Metadata Access.

category
string
  

The Page's category. e.g. Product/Service, Computers/Technology. Can be read with Page Public Content Access or Page Public Metadata Access.

Básico
category_list
list<PageCategory>
  

The Page's sub-categories

checkins
unsigned int32
  

Number of checkins at a place represented by a Page

Básico
company_overview
string
  

The company overview. Applicable to Companies. Can be read with Page Public Content Access or Page Public Metadata Access.

connected_instagram_account
IGUser
  

Instagram account connected to page via page settings

connected_page_backed_instagram_account
IGUser
  

Linked page backed instagram account for this page

contact_address
MailingAddress
  

The mailing or contact address for this page. This field will be blank if the contact address is the same as the physical address

copyright_attribution_insights
CopyrightAttributionInsights
  

Insight metrics that measures performance of copyright attribution. An example metric would be number of incremental followers from attribution

copyright_whitelisted_ig_partners
list<string>
  

Instagram usernames who will not be reported in copyright match systems

country_page_likes
unsigned int32
  

If this is a Page in a Global Pages hierarchy, the number of people who are being directed to this Page. Can be read with Page Public Content Access or Page Public Metadata Access.

cover
CoverPhoto
  

Information about the page's cover photo

culinary_team
string
  

Culinary team of the business. Applicable to Restaurants or Nightlife. Can be read with Page Public Content Access or Page Public Metadata Access.

current_location
string
  

Current location of the Page. Can be read with Page Public Content Access or Page Public Metadata Access.

delivery_and_pickup_option_info
list<string>
  

A Vector of url strings for delivery_and_pickup_option_info of the Page.

description
string
  

The description of the Page. Can be read with Page Public Content Access or Page Public Metadata Access. Note that this value is mapped to the Additional Information setting in the Edit Page Info user interface.

Básico
description_html
string
  

The description of the Page in raw HTML. Can be read with Page Public Content Access or Page Public Metadata Access.

differently_open_offerings
list<KeyValue:enum,bool>
  

To be used when temporary_status is set to differently_open to indicate how the business is operating differently than usual, such as a restaurant offering takeout. Enum keys can be one or more of the following: ONLINE_SERVICES, DELIVERY, PICKUP, OTHER with the value set to true or false. For example, a business offering food pick up but pausing delivery would be differently_open_offerings:{"DELIVERY":"false", "PICKUP":"true"}

directed_by
string
  

The director of the film. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

display_subtext
string
  

Subtext about the Page being viewed. Can be read with Page Public Content Access or Page Public Metadata Access.

displayed_message_response_time
string
  

Page estimated message response time displayed to user. Can be read with Page Public Content Access or Page Public Metadata Access.

emails
list<string>
  

The emails listed in the About section of a Page. Can be read with Page Public Content Access or Page Public Metadata Access.

engagement
Engagement
  

The social sentence and like count information for this Page. This is the same info used for the like button

fan_count
unsigned int32
  

The number of users who like the Page. For Global Pages this is the count for all Pages across the brand. Can be read with Page Public Content Access or Page Public Metadata Access. For New Page Experience Pages, this field will return followers_count.

featured_video
Video
  

Video featured by the Page

features
string
  

Features of the vehicle. Applicable to Vehicles. Can be read with Page Public Content Access or Page Public Metadata Access.

followers_count
unsigned int32
  

Number of page followers

food_styles
list<string>
  

The restaurant's food styles. Applicable to Restaurants

founded
string
  

When the company was founded. Applicable to Pages in the Company category. Can be read with Page Public Content Access or Page Public Metadata Access.

general_info
string
  

General information provided by the Page. Can be read with Page Public Content Access or Page Public Metadata Access.

general_manager
string
  

General manager of the business. Applicable to Restaurants or Nightlife. Can be read with Page Public Content Access or Page Public Metadata Access.

genre
string
  

The genre of the film. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

global_brand_page_name
string
  

The name of the Page with country codes appended for Global Pages. Only visible to the Page admin. Can be read with Page Public Content Access or Page Public Metadata Access.

global_brand_root_id
numeric string
  

This brand's global Root ID

has_added_app
bool
  

Indicates whether this Page has added the app making the query in a Page tab. Can be read with Page Public Content Access.

has_transitioned_to_new_page_experience
bool
  

indicates whether a page has transitioned to new page experience or not

has_whatsapp_business_number
bool
  

Indicates whether WhatsApp number connected to this page is a WhatsApp business number. Can be read with Page Public Content Access or Page Public Metadata Access.

has_whatsapp_number
bool
  

Indicates whether WhatsApp number connected to this page is a WhatsApp number. Can be read with Page Public Content Access or Page Public Metadata Access.

hometown
string
  

Hometown of the band. Applicable to Bands

hours
map<string, string>
  

Indicates a single range of opening hours for a day. Each day can have 2 different hours ranges. The keys in the map are in the form of {day}_{number}_{status}. {day} should be the first 3 characters of the day of the week, {number} should be either 1 or 2 to allow for the two different hours ranges per day. {status} should be either open or close to delineate the start or end of a time range. An example with: { "hours": { "mon_1_open": "09:00", //open at 9am on Monday "mon_1_close": "12:00", //close at 12pm "mon_2_open": "13:15", //open at 1:15pm "mon_2_close": "18:00". //close at 6pm } If one specific day is open 24 hours, the range should be specified as 00:00 to 24:00. If the place is open 24/7, use the is_always_open field instead. Note: If a business is open during the night, the closing time can not pass 6:00am. For example, "mon_2_open":"13:15" and "mon_2_close":"5:59" will work however "mon_close_close":"6:00" will not.

impressum
string
  

Legal information about the Page publishers. Can be read with Page Public Content Access or Page Public Metadata Access.

influences
string
  

Influences on the band. Applicable to Bands. Can be read with Page Public Content Access or Page Public Metadata Access.

instagram_business_account
IGUser
  

Instagram account linked to page during Instagram business conversion flow

instant_articles_review_status
enum
  

Indicates the current Instant Articles review status for this page. Values can be APPROVED, NOT_SUBMITTED, PENDING, REJECTED, or SUSPENDED.

is_always_open
bool
  

Indicates whether this location is always open. Can be read with Page Public Content Access or Page Public Metadata Access.

is_chain
bool
  

Indicates whether location is part of a chain. Can be read with Page Public Content Access or Page Public Metadata Access.

is_community_page
bool
  

Indicates whether the Page is a community Page. Can be read with Page Public Content Access or Page Public Metadata Access.

is_eligible_for_branded_content
bool
  

Indicates whether the page is eligible for the branded content tool

is_messenger_bot_get_started_enabled
bool
  

Indicates whether the page is a Messenger Platform Bot with Get Started button enabled

is_messenger_platform_bot
bool
  

Indicates whether the page is a Messenger Platform Bot. Can be read with Page Public Content Access or Page Public Metadata Access.

is_owned
bool
  

Indicates whether Page is owned. Can be read with Page Public Content Access or Page Public Metadata Access.

is_permanently_closed
bool
  

Whether the business corresponding to this Page is permanently closed. Can be read with Page Public Content Access or Page Public Metadata Access.

is_published
bool
  

Indicates whether the Page is published and visible to non-admins

is_unclaimed
bool
  

Indicates whether the Page is unclaimed

is_verified
bool
  

Deprecated, use "verification_status". Pages with a large number of followers can be manually verified by Facebook as [having an authentic identity] (https://www.facebook.com/help/196050490547892). This field indicates whether the Page is verified by this process. Can be read with Page Public Content Access or Page Public Metadata Access.

Obsoleto
is_webhooks_subscribed
bool
  

Indicates whether the application is subscribed for real time updates from this page

keywords
null
  

Deprecated. Returns null

Obsoleto
leadgen_tos_acceptance_time
datetime
  

Indicates the time when the TOS for running LeadGen Ads on the page was accepted

leadgen_tos_accepted
bool
  

Indicates whether a user has accepted the TOS for running LeadGen Ads on the Page

leadgen_tos_accepting_user
User
  

Indicates the user who accepted the TOS for running LeadGen Ads on the page

link
string
  

The Page's Facebook URL

Básico
location
Location
  

The location of this place. Applicable to all Places

members
string
  

Members of this org. Applicable to Pages representing Team Orgs. Can be read with Page Public Content Access.

merchant_id
string
  

The instant workflow merchant ID associated with the Page. Can be read with Page Public Content Access or Page Public Metadata Access.

merchant_review_status
enum
  

Review status of the Page against FB commerce policies, this status decides whether the Page can use component flow

messenger_ads_default_icebreakers
list<string>
  

The default ice breakers for a certain page

messenger_ads_default_page_welcome_message
MessengerDestinationPageWelcomeMessage
  

The default page welcome message for Click to Messenger Ads

messenger_ads_default_quick_replies
list<string>
  

The default quick replies for a certain page

messenger_ads_quick_replies_type
enum
  

Indicates what type this page is and we will generate different sets of quick replies based on it. Values include UNKNOWN, PAGE_SHOP, or RETAIL.

mission
string
  

The company mission. Applicable to Companies

mpg
string
  

MPG of the vehicle. Applicable to Vehicles. Can be read with Page Public Content Access or Page Public Metadata Access.

name
string
  

The name of the Page

BásicoPredeterminado
name_with_location_descriptor
string
  

The name of the Page with its location and/or global brand descriptor. Only visible to a page admin. Non-page admins will get the same value as name.

network
string
  

The TV network for the TV show. Applicable to TV Shows. Can be read with Page Public Content Access or Page Public Metadata Access.

new_like_count
unsigned int32
  

The number of people who have liked the Page, since the last login. Only visible to a Page admin. Can be read with Page Public Content Access or Page Public Metadata Access.

offer_eligible
bool
  

Offer eligibility status. Only visible to a page admin

overall_star_rating
float
  

Overall page rating based on rating survey from users on a scale of 1-5. This value is normalized and is not guaranteed to be a strict average of user ratings. If there are 0 or a small number of ratings, this field will not be returned.

page_token
string
  

SELF_EXPLANATORY

parent_page
Page
  

Parent Page of this Page. If the Page is part of a Global Root Structure and you have permission to the Global Root, the Global Root Parent Page is returned. If you do not have Global Root permission, the Market Page for your current region is returned as the Parent Page. If your Page is not part of a Global Root Structure, the Parent Page is returned.

parking
PageParking
  

Parking information. Applicable to Businesses and Places

payment_options
PagePaymentOptions
  

Payment options accepted by the business. Applicable to Restaurants or Nightlife

personal_info
string
  

Personal information. Applicable to Pages representing People. Can be read with Page Public Content Access.

personal_interests
string
  

Personal interests. Applicable to Pages representing People. Can be read with Page Public Content Access or Page Public Metadata Access.

pharma_safety_info
string
  

Pharmacy safety information. Applicable to Pharmaceutical companies. Can be read with Page Public Content Access or Page Public Metadata Access.

phone
string
  

Phone number provided by a Page. Can be read with Page Public Content Access.

pickup_options
list<enum>
  

List of pickup options available at this Page's store location. Values can include CURBSIDE, IN_STORE, and OTHER.

place_type
enum
  

For places, the category of the place. Value can be CITY, COUNTRY, EVENT, GEO_ENTITY, PLACE, RESIDENCE, STATE_PROVINCE, or TEXT.

plot_outline
string
  

The plot outline of the film. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

preferred_audience
Targeting
  

Group of tags describing the preferred audienceof ads created for the Page

press_contact
string
  

Press contact information of the band. Applicable to Bands

price_range
string
  

Price range of the business, such as a restaurant or salon. Values can be one of $, $$, $$$, $$$$, Not Applicable, or null if no value is set.. Can be read with Page Public Content Access or Page Public Metadata Access.

privacy_info_url
string
  

Privacy url in page info section

produced_by
string
  

The productor of the film. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

products
string
  

The products of this company. Applicable to Companies

promotion_eligible
bool
  

Boosted posts eligibility status. Only visible to a page admin

promotion_ineligible_reason
string
  

Reason for which boosted posts are not eligible. Only visible to a page admin

public_transit
string
  

Public transit to the business. Applicable to Restaurants or Nightlife. Can be read with Page Public Content Access or Page Public Metadata Access.

rating_count
unsigned int32
  

Number of ratings for the Page (limited to ratings that are publicly accessible). Can be read with Page Public Content Access or Page Public Metadata Access.

recipient
numeric string
  

Messenger page scope id associated with page and a user using account_linking_token

record_label
string
  

Record label of the band. Applicable to Bands. Can be read with Page Public Content Access or Page Public Metadata Access.

release_date
string
  

The film's release date. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

restaurant_services
PageRestaurantServices
  

Services the restaurant provides. Applicable to Restaurants

restaurant_specialties
PageRestaurantSpecialties
  

The restaurant's specialties. Applicable to Restaurants

schedule
string
  

The air schedule of the TV show. Applicable to TV Shows. Can be read with Page Public Content Access or Page Public Metadata Access.

screenplay_by
string
  

The screenwriter of the film. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

season
string
  

The season information of the TV Show. Applicable to TV Shows. Can be read with Page Public Content Access or Page Public Metadata Access.

single_line_address
string
  

The Page address, if any, in a simple single line format. Can be read with Page Public Content Access or Page Public Metadata Access.

starring
string
  

The cast of the film. Applicable to Films. Can be read with Page Public Content Access or Page Public Metadata Access.

start_info
PageStartInfo
  

Information about when the entity represented by the Page was started

store_code
string
  

Unique store code for this location Page. Can be read with Page Public Content Access or Page Public Metadata Access.

store_location_descriptor
string
  

Location Page's store location descriptor

store_number
unsigned int32
  

Unique store number for this location Page

studio
string
  

The studio for the film production. Applicable to Films

supports_donate_button_in_live_video
bool
  

Whether the user can add a Donate Button to their Live Videos.

supports_instant_articles
bool
  

Indicates whether this Page supports Instant Articles

talking_about_count
unsigned int32
  

The number of people talking about this Page

temporary_status
enum
  

Indicates how the business corresponding to this Page is operating differently than usual. Enum values {differently_open, temporarily_closed, operating_as_usual, no_data} If set to differently_open use with differently_open_offerings to set status.

unread_message_count
unsigned int32
  

Unread message count for the Page. Only visible to a page admin

unread_notif_count
unsigned int32
  

Number of unread notifications. Only visible to a page admin

unseen_message_count
unsigned int32
  

Unseen message count for the Page. Only visible to a page admin

username
string
  

The alias of the Page. For example, for www.facebook.com/platform the username is 'platform'

Básico
verification_status
string

voip_info
VoipInfo

website
string

were_here_count
unsigned int32

whatsapp_number
string

written_by
string



/{page-id}/picture
height
integer

redirect
boolean

type
enum{small, normal, album, large, square}

width
integer

/page-id/feed
id  string  

actions object  

admin_creator object  

allowed_advertising_objects string  
application object  

attachments object  

backdated_time  float 

call_to_action  object  

can_reply_privately boolean 

caption

Obsoleto para las publicaciones de la página a partir de la versión 3.3.
  string  

child_attachments object  

created_time  float 

description

Obsoleto para las publicaciones de la página a partir de la versión 3.3. Usa attachments{description} en su lugar.
  string  

Descripción de un enlace en la publicación (aparece debajo de caption).
feed_targeting  object  

El objeto que controla la segmentación de la sección de noticias de esta publicación. Cualquier persona en estos grupos tendrá más probabilidades de ver la publicación; otros tendrán menos probabilidades, aunque podrían verla de todos modos. Puede usarse cualquiera de los campos de segmentación que se muestran aquí; ninguno es obligatorio (rige solo para las páginas).
from  

object
  

El name e id de la página, grupo o evento que creó la publicación. Si leíste el campo con un token de acceso de usuario, solo devuelve el usuario actual.
full_picture  string  

URL de una versión de tamaño completo de la foto publicada en la publicación o extraída desde un enlace en la publicación. Si la dimensión máxima de la foto supera los 720 píxeles, se cambiará el tamaño para configurar la dimensión más grande en 720.
icon  string  

Enlace a un icono que representa el tipo de publicación.
instagram_eligibility enum{}  

Indica si la publicación puede promocionarse en Instagram. Si puede promocionarse, devuelve la enumeración eligible. De lo contrario, devuelve una enumeración de los motivos por los cuales no puede promocionarse.

    ineligible_caption_mentions_not_allowed
    ineligible_caption_too_long
    ineligible_media_aspect_ratio
    ineligible_media_dimension
    ineligible_media_square_aspect_ratio
    ineligible_media_square_dimension
    ineligible_post_type
    ineligible_unknown_error
    ineligible_video_length

is_eligible_for_promotion boolean 

Indica si la publicación puede usarse en una promoción.
is_expired  boolean 

Indica si la publicación tiene una fecha de caducidad que ya caducó.
is_hidden boolean 

Indica si la publicación se marca como oculta (rige solo para las páginas). Al ocultar una publicación, se oculta en la biografía de la página, pero sigue visible en otros lugares de Facebook, por ejemplo, un enlace.
is_instagram_eligible string  

Indica si esta publicación puede promocionarse en Instagram.
is_popular  boolean 

Indica si la publicación es popular. Se determina sobre la base de si las acciones totales como porcentaje del alcance superan un umbral determinado.
is_published  boolean 

Indica si se realizó efectivamente una publicación programada (rige solo para las publicaciones de páginas programadas; para las publicaciones de usuarios y las publicaciones hechas de inmediato, este valor es siempre true). Ten presente que, para las publicaciones de la página creadas como parte del proceso de creación de anuncios, este valor es siempre false.
is_spherical  boolean 

Indica si es una publicación con video esférico.
link

Obsoleto para las publicaciones de la página a partir de la versión 3.3.

En su lugar, usa attachments{unshimmed_url}.
  string  

Enlace adjunto a la publicación.
message string  

El mensaje de estado de la publicación.
message_tags  array 

Matriz de perfiles etiquetados en el texto del message. Si leíste el campo con un token de acceso de usuario, solo devuelve el usuario actual.
name

Obsoleto para las publicaciones de la página a partir de la versión 3.3.

En su lugar, usa attachments{title}.
  string  

Nombre del link.
object_id

Obsoleto para las publicaciones de la página a partir de la versión 3.3.

En su lugar, usa attachments{target{id}}.
  string  

Identificador de la foto o el video subidos que se adjuntaron a la publicación.
parent_id string  

Identificador de una publicación principal para esta publicación, si existe. Por ejemplo, si la historia es "Tu página fue mencionada en la historia de una publicación", el parent_id será la publicación original donde se hizo la mención.
permalink_url string  

La URL estática permanente de la publicación en www.facebook.com. Ejemplo: https://www.facebook.com/FacebookForDevelopers/posts/10153449196353553.
place string  

El identificador del lugar asociado con la publicación.
privacy object  

La configuración de privacidad de la publicación.
promotable_id string  

Identificador de la publicación que se usa para promocionar las historias que no pueden promocionarse directamente.
promotion_eligibility

Obsoleto. Consulta is_eligible_for_promotion.
  boolean Indica si la publicación puede usarse en una promoción.
promotion_status

Obsoleto. Consulta is_eligible_for_promotion.
  string  Estado de la promoción. Requiere privilegios de administrador de la página. Valores posibles:
properties  object  

Lista de propiedades de un video adjunto, por ejemplo, la longitud del video.
sheduled_publish_time float 

La marca de tiempo de UNIX del momento de publicación programado para la publicación.
shares  object  

El recuento de veces que se compartió la publicación. Este recuento puede incluir las publicaciones eliminadas y las publicaciones que no puedes ver por motivos de privacidad.
source

Obsoleto para las publicaciones de la página a partir de la versión 3.3.

En su lugar, usa attachments{media{source}}.
  string  

URL a contenido Flash o un archivo de video que se adjuntó a la publicación.
status_type enum{}  

El tipo de actualización de estado. Los valores son:

    added_photos
    added_video
    app_created_story
    approved_friend
    created_event
    created_group
    created_note
    mobile_status_update
    published_story
    shared_story
    tagged_in_photo
    wall_post

story string  

El texto de las historias no generadas intencionalmente por los usuarios (por ejemplo, aquellas que se generan cuando se agrega una foto). Es preciso activar la migración "Incluir historias de actividad reciente" en la app para recuperar este campo.
story_tags  array 

La lista de etiquetas en la descripción de la publicación.
subscribed  boolean 

Indica si un usuario se suscribió a la publicación.
targeting object  

El objeto que limita el público del contenido. Solo los públicos que figuran en los datos demográficos especificados pueden ver este contenido. Los datos demográficos son acumulativos. Cada valor adicional agrega su público al público objetivo acumulativo. Estos valores no anulan las restricciones demográficas que quizá estén activas en el nivel de la página.
to  

object
  

Perfiles mencionados o segmentados en esta publicación. Si leíste el campo con un token de acceso de usuario, solo devuelve el usuario actual.
type

Obsoleto para las publicaciones de la página a partir de la versión 3.3.

En su lugar, usa attachments{media_type}. Si no hay attachments ni media_type=link, el valor es el mismo que el de type=status.
  enum{}  

Una cadena que indica el tipo de objeto de esta publicación. Los valores de enum incluyen:

    link
    offer
    photo

  

    status
    video

updated_time  float 

El momento de la última actualización de la publicación, que corresponde al momento de creación o de edición o en el que un usuario hizo un comentario en una publicación, expresado como marca de tiempo de UNIX.
video_buying_eligibility  array 

Indica si la publicación puede promocionarse con distintas opciones de compra de video. Devuelve una lista vacía si el video cumple los requisitos. De lo contrario, devuelve una lista de los motivos por los que la publicación no puede promocionarse.
with_tags 

object
  

Perfiles etiquetados para indicar que están con la persona que hace esta publicación. Si leíste el campo con un token de acceso de usuario, solo devuelve el usuario actual.

Este punto de conexión quedará obsoleto el 30 de abril de 2019 para la versión 3.3 y versiones posteriores de la API Graph y la API de marketing. Las apps que hayan usado este punto de conexión en los últimos 90 días podrán seguir usándolo con la versión 3.2 y anteriores de la API hasta el 30 de julio de 2019. Las apps que no hayan usado el punto de conexión en los últimos 90 días no podrán usarlo desde el 30 de abril de 2019.



{
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
         "id": "552760701890501_887301781769723",
         "created_time": "2020-07-21T03:09:56+0000",
         full_picture: 'https://url'
      },
    ]
}