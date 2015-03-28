'use strict';

var _ = require('lodash'),
    jwt = require('jsonwebtoken');

module.exports = function(config){
  var model = {};

  /*
   * Required
   */

  model.getAccessToken = function (bearerToken, callback) {
    try {
      var decoded = jwt.verify(bearerToken, config.get('OAuth.tokenSecret'));
      callback(false, decoded);

    } catch(err) {
      callback(false, false);
    }
  };

  model.getRefreshToken = function (bearerToken, callback) {
    try {
      var decoded = jwt.verify(bearerToken, config.get('OAuth.tokenSecret'));
      callback(false, decoded);
    } catch(err) {
      console.log(err);
      callback(false, false);
    }
  };

  model.generateToken = function(type, req, callback) {
    var expirations = {
      'accessToken': config.get('OAuth.accessTokenLifetime') || 60000,
      'refreshToken': config.get('OAuth.refreshTokenLifetime') || 120000
    };

    var now = new Date().getTime() + expirations[type];

    var token = jwt.sign({
      type: type,
      clientId: req.oauth.client.clientId,
      userId: req.user.id,
      expires: now
    }, config.get('OAuth.tokenSecret'));

    callback(false, token);

  };

  model.saveAccessToken = function (accessToken, clientId, expires, userId, callback) {
    callback(false);
  };

  model.saveRefreshToken = function (refreshToken, clientId, expires, userId, callback) {
    callback(false);
  };

  model.getUser = function(username, password, callback){
    function logUser(error, user){
      if(!error){
        config.get('OAuth.log')(
            _(user).
                omit('password').
                assign({
                    timestamp: new Date().getTime()
                }).
                value()
        );
      }
      callback(error, user);
    }
    config.get('OAuth.getUser')(username, password, logUser);
  };

  model.getClient = config.get('OAuth.getClient');
  model.grantTypeAllowed = config.get('OAuth.grantTypeAllowed');

  return model;
}
