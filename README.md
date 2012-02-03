# bricks-rewrite

A rewrite module for [bricks.js](http://bricksjs.com/ "bricks.js").

## Installing

    $ npm install bricks-rewrite

## Usage

    var rewrite = require('bricks-rewrite');
    
    var rules = [
      {
        path:    '^/$',
        replace: '/index.html'
      }
    ];
    
    appserver.addRoute('.+', rewrite, { section: "pre", rules: rules });