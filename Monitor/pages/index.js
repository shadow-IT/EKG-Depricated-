import fetch from 'isomorphic-unfetch'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faHeartbeat as fasHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

library.add(fasHeart, fasHeartbeat, farHeart)

const Index = ({internals, subscriptions}) => (
	<div>
		<div>
			<div>
				<h1>Internals:</h1>
				<ul>
				{internals.map(result => {
					let color = result.status == 200
						? {color: 'green'}
						: {color: 'red'}
					return <li style={color}>{result.name}</li>
				})}
				</ul>
			</div>
			<div>
				<h1>Subscriptions:</h1>
				<ul>
				{subscriptions
					? subscriptions.map(result => {
						return <li>{result.name}</li>
					})
					: 'The subscriptions are not loaded.'
				}
				</ul>
			</div>
		</div>
		<div>
			<FontAwesomeIcon icon={["fas", "heart"]}/>
			<FontAwesomeIcon icon={["far", "heart"]}/>
			<FontAwesomeIcon icon={["fas", "heartbeat"]}/>
		</div>
	</div>
)

Index.getInitialProps = async function() {
	const historyRes = await fetch('http://history:3001/health')
	const historyStatus = await historyRes.status

	const subscriptionRes = await fetch('http://subscription:3003/health')
	const subscriptionStatus = await subscriptionRes.status

	const cadenceRes = await fetch('http://cadence:3002/health')
	const cadenceStatus = await cadenceRes.status

	const commuterRes = await fetch('http://commuter:3004/health')
	const commuterStatus = await commuterRes.status

	let internals = [{
		name: 'history',
		status: historyStatus
	},{
		name: 'subscription',
		status: subscriptionStatus
	},{
		name: 'cadence',
		status: cadenceStatus
	},{
		name: 'commuter',
		status: commuterStatus
	}]
	
	return await fetch('http://subscription:3003/api/subscriptions')
		.then(result => result.json())
		.then((servicesRes => {
			console.log('servicesRes=',servicesRes)
			let services = servicesRes.result
	
			console.log('internals=',internals)
			console.log('services=',services)

			return {internals, services}
		}))
}

export default Index
