const express = require('express')
const app = express()
const axios = require('axios')
const {performance} = require('perf_hooks');

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

app.listen(port, () => console.log(`Commuter listening on port ${port}!`))
