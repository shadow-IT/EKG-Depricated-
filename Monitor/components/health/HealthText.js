import PropTypes from 'prop-types';

const ALIVE = 'up';
const DEAD = 'down';

function getStyle(props) {
    return {
        textTransform: 'uppercase',
        color: props.alive ? 'green' : 'red'
    }
}

const HealthText = props => (
    <div style={getStyle(props)}>{props.alive ? ALIVE : DEAD}</div>
);

HealthText.displayName = 'HealthText';

HealthText.propTypes = {
    alive: PropTypes.bool.isRequired
};

export default HealthText;
