var vows    = require('vows'),
    assert  = require('assert'),
    rewrite = require('../lib/rewrite');

function Response() {
    
}

Response.prototype.defaultCheckRoute = function (route, path, request) {
    if (typeof(route) === 'function') {
        try {
            var match = route(path, request);
            if (match) {
                return true;
            }
        } catch(error) {
            this.emit('route.fatal', error);
        }
    } else if (typeof(route) === 'object') {
        throw "RegExp as function has been depricated as of Node.js 0.5";
    } else {
        if ((typeof(route) === 'string') && path.match(route)) {
            return true;
        }
    }

    return false;
};

Response.prototype.next = function () {
    
};

rewrite.init({ rules: [ { path: "^/$", replace: '/index.html' } ] });

vows.describe('Rewrite').addBatch({
    'rewrite of path / to /index.html': {
        topic: function () {
            var request = { url: '/' };
            var response = new Response();
            
            rewrite.plugin(request, response);
            
            return request;
        },
        'should end up with /index.html': function (topic) {
            assert.equal(topic.url, '/index.html');
        }
    },
    'rewrite of path /?foo=bar to /index.html?foo=bar': {
        topic: function () {
            var request = { url: '/?foo=bar' };
            var response = new Response();
            
            rewrite.plugin(request, response);
            
            return request;
        },
        'should end up with /index.html?foo=bar': function (topic) {
            assert.equal(topic.url, '/index.html?foo=bar');
        }
    },
    'do not rewrite of path /foo/?foo=bar to /index.html?foo=bar': {
        topic: function () {
            var request = { url: '/foo/?foo=bar' };
            var response = new Response();
            
            rewrite.plugin(request, response);
            
            return request;
        },
        'should end up with /foo/?foo=bar': function (topic) {
            assert.equal(topic.url, '/foo/?foo=bar');
        }
    }
    
}).export(module);