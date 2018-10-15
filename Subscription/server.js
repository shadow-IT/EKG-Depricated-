var express = require('express');
var bodyParser = require('body-parser')
var redis = require('redis');
let properties = require('./properties.json')
let { set, size, get } = require('./subscriptions.js')
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

properties.services.map(service => {
	let serviceName = service.name
	let serviceUrl = service.url

	set(serviceName, serviceUrl)
});


app.get('/', function(req, res){
	res.send('Hello Subscription!\n' + properties);
});

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.get('/api', function(req, res) {
	res.send( size() )
})

app.get('/api/:serviceName', function(req, res) {
	const serviceName = req.params.serviceName
	res.send( get(serviceName) )
})

app.patch('/api/properties', function(req, res) {
	properties = require('./properties.json')
	console.log(properties)
	res.send(properties)
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
	res.send( set(serviceName, url) )
})

console.log('Listening on port:',PORT)
app.listen(PORT);
