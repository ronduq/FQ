import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ iconName, className}) => (
  <svg className={className} aria-hidden="true" focusable="false">
    <use xlinkHref={`#${iconName}`} />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default Icon;