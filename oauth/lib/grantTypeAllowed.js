'use strict';

var authorizedClientIds = {
	password: [
		'thom'
	],
	refresh_token: [
		'thom'
	]
};

module.exports = function grantTypeAllowed(clientId, grantType, callback) {
	callback(false, authorizedClientIds[grantType] &&
	authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0);
};
