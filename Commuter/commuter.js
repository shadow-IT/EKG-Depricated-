const express = require('express')
const app = express()
const axios = require('axios')
const fetch = require('isomorphic-unfetch')

app.port = 3004

app.get('/', function(req, res) {
	res.send('Hello commuter!')
})

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

app.get('/api/:subscriptionName', async function(req, res) {
	const subName = req.params.subscriptionName

	// console.log('Got a reqest to commute to',subName)
	// console.log('Need to retrieve the URL first. Requesting URL for',subName)

	const url = await axios.get('http://subscription:3003/api/'+subName)
	.then(res => res.data)
	.then(data => {
		// console.log('Got the URL information!',data)
		return data.url
	})
	.catch(err => {
		console.log('Error communicating with subscription for,',subName)
		res.send(500, 'Error communicating with subscription for',subName)
	})

	if (!url)
		return;

	const subResponse = await axios.get(url)
	.then(res => {
		return res
	})
	.catch(err => {
		return err.response
	})
	.then(data => {
		return {
			cadenceStatus: data.status,
			cadenceSummary: data.statusText,
			details: {
				destination: data.config.url,
				method: data.config.method,
				data: data.data
			}
		}
	})

	if (!subResponse)
		return;
	
	const historyObject = {
		subscriptionName: subName,
		subscriptionResponse: subResponse
	};
	// console.log('=============================')
	// console.log(historyObject)
	// console.log('=============================')

	const historyResponse = await axios.post('http://history:3001/api/', historyObject)
	.then(() => res.sendStatus(200))
	.catch(err => {
		console.log('An error occured when calling history.',historyObject.subscriptionName)
		res.send(500, 'Failed to save the results for',historyObject.subscriptionName)
	})
})

app.listen(app.port, () => console.log(`Commuter listening on port ${app.port}!`))

module.exports = app; // For testing.