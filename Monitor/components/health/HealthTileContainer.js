import PropTypes from 'prop-types';

import HealthTile from './HealthTile';

function getStyle() {
    return {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    };
}

//TODO: Maybe make the array not required or check if the array is empty and display some text saying there are no subscriptions set?
const HealthTileContainer = props => (
    <div style={getStyle()}>
        {props.statuses.map(status => <HealthTile key={status.name} name={status.name} alive={status.status === 200}/>)}
    </div>
);

HealthTileContainer.displayName = 'HealthTileContainer';

//TODO: Does this work as intended?
HealthTileContainer.propTypes = {
    statuses: PropTypes.arrayOf({
        name: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired
    }).isRequired
};

export default HealthTileContainer;
