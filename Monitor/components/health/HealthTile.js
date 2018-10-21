import PropTypes from 'prop-types';

import HealthIcon from './HealthIcon';
import HealthText from './HealthText';

function getStyle(props) {
    return {
        width: '6em',
        height: '6.5em',

        padding: '8px',
        marginRight: '4px',
        marginBottom: '4px',

        textTransform: 'capitalize',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        border: '1px solid',
        borderRadius: '4px' //This is 1/4 of a 16px font size.
    }
}

const HealthTile = props => (
    <div style={getStyle(props)}>
        <div>{props.name}</div>
        <HealthIcon {...props}/>
        <HealthText {...props}/>
    </div>
);

HealthTile.displayName = 'HealthTile';

HealthTile.propTypes = {
    name: PropTypes.string.isRequired
};

export default HealthTile;
