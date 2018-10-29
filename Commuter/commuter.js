const express = require('express')
const app = express()
const axios = require('axios')
const fetch = require('isomorphic-unfetch')

const port = 3004

app.get('/', function(req, res) {

	const health = {health: true}

	// TODO POST to history here, the result of the health check.

	res.send({
		message: 'Hello commuter!'
		// TODO return the result of the save
	})
})

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.get('/api/:subscriptionName', async function(req, res) {
	const subName = req.params.subscriptionName

	console.log('Got a reqest to commute to',subName)
	console.log('Need to retrieve the URL first. Requesting URL for',subName)

	const url = await axios.get('http://subscription:3003/api/'+subName)
	.then(res => res.data)
	.then(data => {
		console.log('Got the URL information!',data)
		return data
	})

	const subResponse = await axios.get(url)
	.then(res => res.data)
	.then(data => {
		console.log('Got a response from subscriber',subName,data)
		return data
	})
	
	const historyResponse = await axios.post('http://history:3001/api/', {
		serviceName: subName,
		serviceResponse: subResponse
	})
	.then(res => res.data)
	.then(data => console.log('Got a response from History!',data))
})

app.listen(port, () => console.log(`Commuter listening on port ${port}!`))
