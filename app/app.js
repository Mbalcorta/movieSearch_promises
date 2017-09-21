var rp = require('request-promise');

var cheerio = require('cheerio'); // Basically jQuery for node.js

var options = {
    uri: 'http://www.imdb.com',
    path: '/find?ref_=nv_sr_fn&q=findingnemo&s=all',
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(function ($) {
        // Process html like you would with jQuery...
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });