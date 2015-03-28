'use strict';

var oauthClients = [
	{
		clientId : 'thom',
		clientSecret : 'nightworld',
		redirectUri : ''
	}
];

module.exports = function getClient (clientId, clientSecret, callback) {
	for(var i = 0, len = oauthClients.length; i < len; i++) {
		var elem = oauthClients[i];
		if(elem.clientId === clientId &&
			(clientSecret === null || elem.clientSecret === clientSecret)) {
			return callback(false, elem);
		}
	}
	callback(false, false);
};