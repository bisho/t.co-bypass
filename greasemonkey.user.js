// ==UserScript==
// @name        t.co bypass
// @namespace   http://darcsys.com
// @include     https://twitter.com/*
// @include     https://tweetdeck.com/*
// @include     https://tweetdeck.twitter.com/*
// @version     1
// @grant       none
// ==/UserScript==

var link_url_props = ['data-expanded-url', 'data-full-url', 'title'];

var observer = new MutationObserver(function(mutations) {
  var links = document.getElementsByClassName("twitter-timeline-link");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (! link.href) {
      continue;
    }
    if (link.href.indexOf('http://t.co/') != 0 && link.href.indexOf('https://t.co/') != 0 ) {
      continue;
    }
    for (var prop in link_url_props) {
      var value = link.getAttribute(link_url_props[prop])
      if (value) {
        link.href = value;
        break;
      }
    }
  };
});

var config = { 
  childList: true,
  subtree: true
};

observer.observe(document.body, config);
