var redis = require('redis');
var client = redis.createClient('https://redis-subscription');
client.on('connect', function() {
	console.log('Redis client connected');
});

client.on('error', function (err) {
	console.log('Something went wrong ' + err);
});

exports.set = function(serviceName, serviceUrl, callback) {
	client.set(serviceName, serviceUrl, function (error, result) {
		console.log('client.set ' +serviceName+ ' url:' +serviceUrl)
		if (error) {
			console.log(error);
			throw error;
		}
		callback({result})
	});
}

exports.size = function(callback) {
	client.dbsize(function(error, result) {
		console.log('result:',result)
		callback({result})
	})
}

exports.get = function(serviceName, callback) {
	client.get(serviceName, function (error, result) {
		console.log('client.get,', serviceName)
		if (error) {
			console.log(error);
			throw error;
		}
		console.log('GET result ->' + result);
		callback({result})
	});
}

exports.all = function(callback) {
	client.keys('*', function (err, keys) {
		if (err) return console.log(err);
		console.log('keys=',keys)

		let result = []
		keys.forEach(key => result.push({
			name: key
		}))

		console.log('result:',{result})
		callback({result})
	});
}
