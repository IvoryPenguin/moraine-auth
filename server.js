'use strict';

var config = require('config'),
    moraine = require('moraine-boot'),
    oauthServer = require('./oauth');

moraine().then(function(moraineServer){

    moraineServer.register(oauthServer);
    moraineServer.start();

}).catch(function(error){

    console.error(error);

});
