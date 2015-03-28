'use strict';

var users = [
	{
		id : '123',
		username: 'thomseddon',
		password: 'nightworld'
	}
];

module.exports = function getUser (username, password, callback) {
	for(var i = 0, len = users.length; i < len; i++) {
		var elem = users[i];
		if(elem.username === username && elem.password === password) {
			return callback(false, elem);
		}
	}
	callback(false, false);
};