import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './NotFoundDisplay.module.scss';
import Icon from '../Icon/Icon';
import t from '../Icon/Icon.module.scss';

const NotFoundDisplay = ({classname, type, title, text}) => {
  return (
    <div className={classNames(s.notFoundDisplay, classname)}>
      <div className={s.notFoundDisplayImg}>
        <Icon className={classNames(s.icon, t.iconHuge, t.iconTeal)} iconName={type} />
      </div>
      <p className={s.notFoundDisplayTitle}>{title}</p>
      <p className={s.notFoundDisplayText}>{text}</p>
    </div>
  );
};

NotFoundDisplay.defaultProps = {
  type: 'apple',
  title: 'Not found',
  text: 'No results',
};

NotFoundDisplay.propTypes = {
  classname: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default NotFoundDisplay;
