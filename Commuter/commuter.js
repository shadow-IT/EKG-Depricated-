const express = require('express')
const app = express()
const axios = require('axios');

const port = 3004

app.get('/', function(req, res) {
	res.send('Hello commuter!')
})

app.get('/go', async function(req, res) {
	axios.get('http://subscription:3003/api/subscriptions')
		.then(result => {
			console.log(result.data)
			res.send( result.data )
		}).catch(error => {
			console.log(error);
		});
})

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.listen(port, () => console.log(`Commuter listening on port ${port}!`))
