(function () {
    var url = require('url');

    var rules;

    exports.name = 'rewrite rules';

    exports.init = function (options) {
        options = options || { };
        
        rules = options.rules || [ ];
    };
    
    exports.plugin = function (request, response, options) {
        var parsed = url.parse(request.url, true);
        
        for (var i = 0; i < rules.length; i++) {
            if (response.defaultCheckRoute(parsed.pathname, rules[i].path)) {
                request.url = parsed.pathname.replace(new RegExp(rules[i].path), rules[i].replace) + parsed.search;
            }
        }
        
        response.next();
    };
})();