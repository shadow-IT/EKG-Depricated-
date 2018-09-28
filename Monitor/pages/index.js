import fetch from 'isomorphic-unfetch'

const Index = (props) => (
	<div>
		<h1>Refresh test</h1>
		<p>{props.result}</p>
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
