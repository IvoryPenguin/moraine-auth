'use strict';

var _ = require('lodash');

module.exports = function oauthServer(Config, Logger) {

	Logger.info('Starting OAuth2 Server...');

	var defaultConfigs = {
		"getUser": require('./lib/getUser'),
		"getClient": require('./lib/getClient'),
		"grantTypeAllowed": require('./lib/grantTypeAllowed'),
		"log": Logger.info
	};

	Config.util.extendDeep(defaultConfigs, Config);
	Config.util.setModuleDefaults('OAuth', defaultConfigs);

	var express = require('express'),
		bodyParser = require('body-parser'),
		oauthserver = require('oauth2-server'),
		memorystore = require('./lib/jwtSessions.js')(Config);

	var app = express();

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(bodyParser.json());

	app.oauth = oauthserver(_.assign({
		model: memorystore,
		grants: ['password', 'refresh_token']
	}, Config.get('OAuth')));

	app.all('/oauth/token', app.oauth.grant());

	app.get('/', app.oauth.authorise(), function (req, res) {
		res.send('Secret area');
	});

	app.use(app.oauth.errorHandler());

	app.listen(3000);

};
