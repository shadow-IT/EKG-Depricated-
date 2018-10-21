import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart/* , faHeartbeat as fasHeartbeat */ } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fasHeart/* , fasHeartbeat */, farHeart);

function getStyle(props) {
    return {
        color: 'red'
    };
}

const HealthIcon = props => (
    <FontAwesomeIcon style={getStyle(props)} icon={[props.alive ? 'fas' : 'far', 'heart']}/>
);

HealthIcon.propTypes = {
    alive: PropTypes.bool.isRequired
};

export default HealthIcon;
