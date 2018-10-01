var express = require('express');
var bodyParser = require('body-parser')
var redis = require('redis');

var app = express();
var bodyParser = require('body-parser')
const PORT = 3003

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
var client = redis.createClient('https://redis-subscription');

client.on('connect', function() {
	console.log('Redis client connected');
});

client.on('error', function (err) {
	console.log('Something went wrong ' + err);
});


app.get('/', function(req, res){
	res.send('hello Subscription!');
});

app.get('/api', function(req, res) {
	client.dbsize(function(error, result) {
		console.log('result:',result)
		res.send({result})
	})
})

app.get('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName
	client.get(serviceName, function (error, result) {
		console.log('client.get,', serviceName)
		if (error) {
			console.log(error);
			throw error;
		}
		console.log('GET result ->' + result);
		res.send(result)
	});
})

app.post('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName
	const url = req.body.url

	if(!serviceName || !url){
		res.statusCode = 400
		console.log('A param is missing')
		res.send('A required param is missing.')
		return
	}

	console.log(serviceName)
	client.set(serviceName, url, function (error, result) {
		console.log('client.set ',serviceName, ' url:', url)
		if (error) {
			console.log(error);
			throw error;
		}
		res.send(result)
	});
})

console.log('Listening on port:',PORT)
app.listen(PORT);
