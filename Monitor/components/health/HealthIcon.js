import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fasHeart, farHeart);

function getStyle(props) {
    return {
        color: 'red',
        fontSize: '3em'
    };
}

const HealthIcon = props => (
    <FontAwesomeIcon style={getStyle(props)} icon={[props.alive ? 'fas' : 'far', 'heart']}/>
);

HealthIcon.displayName = 'HealthIcon';

HealthIcon.propTypes = {
    alive: PropTypes.bool.isRequired
};

export default HealthIcon;
