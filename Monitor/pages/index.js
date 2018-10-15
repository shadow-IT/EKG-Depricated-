import fetch from 'isomorphic-unfetch'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faHeartbeat as fasHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

import HealthText from "../components/health/HealthText";

library.add(fasHeart, fasHeartbeat, farHeart)

const Index = (props) => (
	<div>
		<h1>Refresh test</h1>
		{/* <ul>
		{props.results.map(result => {
			let color = result.status === 200
				? {color: 'green'}
				: {color: 'red'}
			return <li style={color}>{result.name}</li>

		})}
		</ul> */}
		{props.results.map(result => <HealthText key={result.name} alive={result.status === 200}/>)}

		<FontAwesomeIcon icon={["fas", "heart"]}/>
		<FontAwesomeIcon icon={["far", "heart"]}/>
		<FontAwesomeIcon icon={["fas", "heartbeat"]}/>
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

	return {results: [{
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
	}]}
}

export default Index
