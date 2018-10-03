import fetch from 'isomorphic-unfetch'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart, faHeartbeat as fasHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

library.add(fasHeart, fasHeartbeat, farHeart)

const Index = (props) => (
	<div>
		<h1>Refresh test</h1>
		<p>{props.result}</p>

		<FontAwesomeIcon icon={["fas", "heart"]}/>
		<FontAwesomeIcon icon={["far", "heart"]}/>
		<FontAwesomeIcon icon={["fas", "heartbeat"]}/>
	</div>
)

Index.getInitialProps = async function() {
	console.log('about to fetch')
	const res = await fetch('http://history:3001/api')
	const json = await res.json()
	console.log('after parse:', json)

	return json
}

export default Index
