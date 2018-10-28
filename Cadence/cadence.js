const express = require('express')
const axios = require('axios')
var schedule = require('node-schedule');
const app = express()

const port = 3002

app.get('/', function(req, res) {

        res.send('Hello cadence!')
})

app.get('/health' , function(req, res) {
	res.sendStatus(200)
})

/* TODO
 * Retrieve the cadence for each subscriber, and store them locally. (redis? Array?)
 * 
 * Periodically re-retrieve the cadences for each subscriber.
 * 
 * Continually loops calling the commuter for each subsciber at its desired cadence.
 * 
 * Manually request the cadence be refreshed.
 */

/* retrieve the subscriptions and their data. */
// const subs = axios.get('http://subscription:3003/p/cadence')
var rule = new schedule.RecurrenceRule();
rule.second = 5;
const subs = [{
	subscriptionName: 'testSub1',
	timingRule: rule
}, {
	subscriptionName: 'testSub222',
	timingRule: {second: 1}
}]
console.log('subs:', subs)
subs.forEach(sub => {
	const subName = sub.subscriptionName
	const subRule = sub.timingRule
	var j = schedule.scheduleJob(subRule, function(){
		console.log('Calling subscription to...', subName);
	}.bind(null, subName));
});


app.listen(port, () => console.log(`Cadence listening on port ${port}!`))
