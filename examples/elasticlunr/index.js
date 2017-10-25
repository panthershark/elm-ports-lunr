require('../../src/styles/index.scss');
var elasticlunr = require('elasticlunr');
var data = require('./data.json');
var throttle = require('lodash.throttle');

// build the index.

var idx = elasticlunr(function() {
  var that = this;

  that.setRef('id');
  that.addField('title');
  that.addField('body');
});

data.forEach(function(r, i) {
  var rec = {
    id: r.title,
    title: r.title,
    body: r.body
  };

  idx.addDoc(rec);
});

var Lunr = require('./Main.elm');
var app = Lunr.Main.embed(document.getElementById('container'));

var search = function(q) {
  var results = idx.search(q);

  if (results.length) {
    app.ports.searchResults.send(
      results.map(function(r) {
        return idx.documentStore.getDoc(r.ref);
      })
    );
  }
  else {
    var expanded_results = idx.search(q, { expand: true });

    app.ports.searchResults.send(
      expanded_results.map(function(r) {
        return idx.documentStore.getDoc(r.ref);
      })
    );
  }
};
app.ports.performSearch.subscribe(throttle(search, 800, { leading: false, trailing: true }));
