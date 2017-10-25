require('../../src/styles/index.scss');
const lunr = require('lunr');
const data = require('./data.json');
var throttle = require('lodash.throttle');

// build the index.
const dict = {};

const idx = lunr(function() {
  const that = this;

  that.ref('id');
  that.field('title');
  that.field('body');

  data.forEach(function(r, i) {
    const rec = {
      id: r.title,
      title: r.title,
      body: r.body
    };

    that.add(rec);

    dict[rec.id] = rec;
  });
});

var Lunr = require('./Main.elm');
var app = Lunr.Main.embed(document.getElementById('container'));

var search = function(q) {
  const results = idx.search(q);

  app.ports.searchResults.send(
    results.map(function(r) {
      return dict[r.ref];
    })
  );
};

app.ports.performSearch.subscribe(throttle(search, 800, { leading: false, trailing: true }));
