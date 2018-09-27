const Index = (props) => (
	<div>
		<p>Hello world!</p>
		<ul>{props.results.map(result => {
			return result.isUp
				? <li>{result.name} is up</li>
				: <li>{result.name} is down</li>
		})}</ul>
	</div>
)

Index.getInitialProps = function() {
	// TODO
	return {
		results: [{
			name: 'Test name',
			isUp: true
	}]}
}

export default Index