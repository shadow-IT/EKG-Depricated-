const express = require('express')
const app = express()
const axios = require('axios')
const fetch = require('isomorphic-unfetch')

axios.interceptors.request.use(function (config) {

	config.metadata = { startTime: performance.now()}
	return config;
})

axios.interceptors.response.use(function (response) {
	response.config.metadata.endTime = performance.now()
	response.duration = response.config.metadata.endTime - response.config.metadata.startTime
	return response;
})

axios.interceptors.response.use(function (response) {
	console.log(response.config.method + ' request to ' + response.config.url + ' took ' + response.duration + 'ms with status ' + response.status)
	return response;
})

const port = 3004

app.get('/', function(req, res) {
	axios.get('https://httpstat.us/200')
		.then(result => {
			res.send(result.data)
		}).catch(error => {
			console.log(error)
		});
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
