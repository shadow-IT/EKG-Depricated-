import PropTypes from 'prop-types';

import HealthIcon from './HealthIcon';
import HealthText from './HealthText';

const HealthTile = props => (
    <div>
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
