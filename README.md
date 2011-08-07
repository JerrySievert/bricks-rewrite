== bricks-rewrite ==

A rewrite module for [bricks.js](http://bricksjs.com/ "bricks.js").

=== Usage ===

    var rewrite = require('bricks-rewrite');
    
    var rules = [
      {
        path:    new RegExp(/^\/$/),
        replace: '/index.html'
      }
    ];
    
    appserver.addRoute('.+', rewrite, { section: "pre", rules: rules });