var URL_TO_WORDPRESS_BLOG = 'https://mavismoztest.wordpress.com';

var WORDPRESS_COM_API_ENDPOINT = "https://public-api.wordpress.com/rest/v1.1/sites/";
var WORDPRESS_BLOG_ID = "105660860";

module.exports = {
  urlToWordPress: URL_TO_WORDPRESS_BLOG,
  wpApiEndpoint: WORDPRESS_COM_API_ENDPOINT + WORDPRESS_BLOG_ID + "/",
  pageID: {
    home: 3,
    about: 1,
    curricula: 9,
    blog: 15
  }
};
