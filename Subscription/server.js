var express = require('express');
var bodyParser = require('body-parser')
let properties = require('./properties.json')
let { set, size, get } = require('./subscriptions.js')
var app = express();
var bodyParser = require('body-parser')
const PORT = 3003

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

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
	size((result) => res.send(result))
})

app.get('/api/subscribers', function(req, res) {
	console.log('Providing ALL of the subscriptions.')
	// TODO 
	res.json({result :[{
		subscriptionName: 'testService1',
		cadence: 1500,
	}]})
})

app.get('/api/:serviceName', async function(req, res) {
	const serviceName = req.params.serviceName
	console.log('Got a request for subscriber information. Subscriber',serviceName)
	get(serviceName, (result) => res.send(result))
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
