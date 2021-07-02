import React from 'react';
import PropTypes from 'prop-types';

const InputTemplate = ({ children, label, classname }) => (
  <div className={classname}>
    <label>
      {label}
      {children}
    </label>
  </div>
);

InputTemplate.propTypes = {
  classname: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string
};

export default InputTemplate;
