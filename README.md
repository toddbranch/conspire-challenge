# conspire frontend challenge

Submission for the [conspire frontend challenge](https://github.com/conspire-org/challenge-frontend).

Built with Backbone.  Dependency management with requirejs.  Build tools via Grunt.  Testing with Jasmine.

## run

```
npm install
bower install
python -m http.server
```

## test

```
grunt test
```

## notes

Using require, I can really easily:
- uglify
- bring in CDN assets with failover to local copies
- reduce all assets to a single script tag
- don't need to namespace in a global object. Eliminates code like this:
```
var Conspire = {};

Conspire.ProgressBar = ...;
// etc.
```

Heads up: I'm getting a javascript error on /welcome on line 506 `Conspire.userIsAdmin = ;`
