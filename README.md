# LUNR, ELASTICLUNR, ELM

Example project which shows how to use ports in elm with a js library. 

This demo indexes the full text of Moby Dick, with each paragraph in a separate record. You can find good search terms by looking [here](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm).

The search libraries:

* [LUNR](https://lunrjs.com/)
* [ELASTIC LUNR](http://elasticlunr.com/)

The Demos:

* [LUNR DEMO](https://tommymessbauer.github.io/elm-ports-lunr/docs/lunr/index.html)
* [ELASTIC LUNR DEMO](https://tommymessbauer.github.io/elm-ports-lunr/docs/elasticlunr/index.html)


# GET STARTED

This repo should be cloned, then renamed/re-initialized for use in a component.

```bash
git clone git@github.com:tommymessbauer/elm-ports-lunr.git your_folder
cd your_folder
yarn run reinstall
yarn run start
```

After starting, a local dev server with HMR will be running at localhost:3000. Both examples are available at these urls.

* [http://localhost:3000/lunr/](http://localhost:3000/lunr/)
* [http://localhost:3000/elasticlunr/](http://localhost:3000/elasticlunr/)


# THINGS TO CONSIDER

* There is lag in page load b/c the entire text of Moby Dick is indexed on the fly in the browser. In production, you should build the index ahead of time and send it down from the server.
* The elastic lunr example is using `expand=false` and if there are no results, it runs `expand=true` which loosens the search and gives more results. 
* Debounce is set to 800ms. Searching is synchronous so it performance is brutal if not debounced.

# MOBY DICK IS COOL, BUT HOW CAN I TRY THIS WITH MY DATA?
This is nbd. Fork this repo, then: 

* Indexing: replace `data.json` with your dataset and tweak the indexing code. 
* Searching: change the `idx.search(...)` parameters to fit your needs.. boosts, wildcards, whatever you like.
* Profit.

# CAN I USE THIS TO PROTOTYPE SEARCH TO OTHERS?
This is exactly why this project was started. Generally, you can do this: 

1. update the `pagePath ''` in webpack.config.js
2. run `yarn run build` (npm if you like). 
* Copy the `tmp` folder to your favorite static file server (github pages, s3, or whatever).
