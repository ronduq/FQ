import React from 'react';
import PropTypes from 'prop-types';
import s from './LoadingSpinner.scss';

const LoadingSpinner = ({ className }) => (
  <div className={[s.spinner, className].join(' ')}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

LoadingSpinner.propTypes = {
  className: PropTypes.string
};

export default LoadingSpinner;
