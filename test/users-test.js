var assert = require('assert');
var requirejs = require("requirejs");
var jsdom = require('mocha-jsdom');

requirejs.config({
    baseUrl: 'javascripts',
    map: {
        '*': {
            'services/userservice': '../test/mocks/userservice'
        }
    },
    nodeRequire: require
});

describe('Users', function() {
    jsdom();
    var Users;
    var $;

    before(function(done) {
        requirejs(['users', 'jquery'], function(users, jquery) {
            Users = users;
            $ = jquery;
            document.body.innerHTML = '<div id="users"></div>';
            done();
        });
    });

    describe('#listUsers()', function () {
        it('should create a list of the users', function (done) {
            Users.listUsers().done(function(users){
                assert.equal('MyName', $('li').text());
                done();
            });
        });
    });
});