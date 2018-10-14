import fetch from 'isomorphic-unfetch'

const Index = (props) => (
	<div>
		<h1>Refresh test</h1>
		<ul>
		{props.result.map(result => (
			<li>{result.name}: {result.status}</li>
		)) || <p>No results from dependencies.</p>}
		</ul>
	</div>
)

Index.getInitialProps = async function() {
	const historyRes = await fetch('http://history:3001/health')
	const historyStatus = await historyRes.status

	const subscriptionRes = await fetch('http://subscription:3003/health')
	const subscriptionStatus = await subscriptionRes.status

	return {result: [{
		name: 'history',
		status: historyStatus
	}, {
		name: 'subscription',
		status: subscriptionStatus
	}]}
}

export default Index
