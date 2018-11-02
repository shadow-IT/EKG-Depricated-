const express = require('express')
const app = express()
const axios = require('axios')
const fetch = require('isomorphic-unfetch')

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

	// console.log('Got a reqest to commute to',subName)
	// console.log('Need to retrieve the URL first. Requesting URL for',subName)

	const url = await axios.get('http://subscription:3003/api/'+subName)
	.then(res => res.data)
	.then(data => {
		// console.log('Got the URL information!',data)
		return data.url
	})

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
	
	const historyObject = {
		subscriptionName: subName,
		subscriptionResponse: subResponse
	};
	// console.log('=============================')
	// console.log(historyObject)
	// console.log('=============================')

	const historyResponse = await axios.post('http://history:3001/api/', historyObject)
	.catch(err => console.log('An error occured when calling history.',err))
	.then(() => res.sendStatus(200))
})

app.listen(port, () => console.log(`Commuter listening on port ${port}!`))
