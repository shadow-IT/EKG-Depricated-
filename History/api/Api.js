var redis = require('redis');

module.exports = function() {
	var client = redis.createClient();

	client.on('connect', function() {
		console.log('Redis client connected');
	});

	client.on('error', function (err) {
		console.log('Something went wrong ' + err);
	});

	client.set('my test key', 'my test value', redis.print);
	client.get('my test key', function (error, result) {
		if (error) {
			console.log(error);
			throw error;
		}
		console.log('GET result ->' + result);
	});

	return {
		results: [{
			name: 'History Api test',
			isUp: true
		},{
			name: 'History Api test #2',
			isUp: false
		}]
	}
}